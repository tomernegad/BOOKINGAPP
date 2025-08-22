const Hotel = require("../models/Hotel");
const Room = require("../models/Room");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    if (!savedHotel) {
      return res.status(500).send("failed to post the hotel");
    }
    res.status(200).send(savedHotel);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const updatedHotel = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedHotel) {
      return res.status(404).send("The hotel to update was not found");
    }
    res.status(200).send(updatedHotel);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deletedHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      return res.status(404).send("Did not find hotel to delete");
    }
    res.status(200).send(deletedHotel);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getHotel = async (req, res, next) => {
  try {
    const { id } = req.params;
    const hotels = await Hotel.findById(id);
    if (!hotels) {
      return res.status(404).send("No hotels found");
    }
    res.status(200).send(hotels);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getHotels = async (req, res, next) => {
  try {
    const { min, max, ...others } = req.query;
    const hotels = await Hotel.find({
      ...others,
      cheapestPrice: { $gt: min || 1, $lt: max || 200 },
    }).limit(req.query.limit);
    if (!hotels) {
      return res.status(404).send("No hotels found");
    }
    res.status(200).send(hotels);
  } catch (err) {
    next(err);
  }
};

const countByCity = async (req, res, next) => {
  const cities = req.query.cities.split(",");
  try {
    const list = await Promise.all(
      cities.map((city) => {
        return Hotel.countDocuments({ city: city });
      })
    );
    res.status(200).send(list);
  } catch (err) {
    next(err);
  }
};
const countByType = async (req, res, next) => {
  try {
    const hotelCount = await Hotel.countDocuments({ type: "hotel" });
    const apartmentCount = await Hotel.countDocuments({ type: "apartment" });
    const resortcount = await Hotel.countDocuments({ type: "resort" });
    const villaCount = await Hotel.countDocuments({ type: "villa" });
    const cabinCount = await Hotel.countDocuments({ type: "cabin" });

    res.status(200).json([
      { type: "hotels", count: hotelCount },
      { type: "apartments", count: apartmentCount },
      { type: "resorts", count: resortcount },
      { type: "villas", count: villaCount },
      { type: "cabins", count: cabinCount },
    ]);
  } catch (err) {
    next(err);
  }
};

const getHotelRooms = async (req, res, next) => {
  try {
    const hotel = await Hotel.findById(req.params.id);
    if (!hotel) {
      return res.status(404).send("Hotel not found");
    }
    const list = await Promise.all(
      hotel.rooms.map((room) => {
        return Room.findById(room);
      })
    );
    res.status(200).json(list);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createHotel,
  updatedHotel,
  deletedHotel,
  getHotel,
  getHotels,
  countByCity,
  countByType,
  getHotelRooms,
};
