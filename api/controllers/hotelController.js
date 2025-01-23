const Hotel = require("../models/Hotel");

const createHotel = async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    if (!savedHotel) {
      res.status(500).send("failed to post the hotel");
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
      res.status(404).send("The hotel to update was not found");
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
      res.status(404).send("Did not found hotel do delete");
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
      res.status(404).send("No hotels found");
    }
    res.status(200).send(hotels);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getHotels = async (req, res, next) => {
  try {
    const hotels = await Hotel.find();
    if (!hotels) {
      res.status(404).send("No hotels found");
    }
    res.status(200).send(hotels);
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
};
