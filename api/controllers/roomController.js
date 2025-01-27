const Room = require("../models/Room");
const Hotel = require("../models/Hotel");
const createError = require("../utils/error.js");

const createRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  const newRoom = new Room(req.body);
  try {
    const savedRoom = await newRoom.save();
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $push: { rooms: savedRoom._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json(savedRoom);
  } catch (err) {
    next(err);
  }
};

const updateRoom = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updateRoom = await Room.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updateRoom) {
      res.status(404).send("The Room to update was not found");
    }
    res.status(200).send(updateRoom);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deletedRoom = async (req, res, next) => {
  const hotelId = req.params.hotelid;
  try {
    const { id } = req.params;
    const deletedRoom = await Room.findByIdAndDelete(id);
    try {
      await Hotel.findByIdAndUpdate(hotelId, {
        $pull: { rooms: req.params.id },
      });
    } catch (err) {
      next(err);
    }
    if (!deletedRoom) {
      res.status(404).send("Did not found Room do delete");
    }
    res.status(200).send("Room has been deleted");
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getRoom = async (req, res, next) => {
  try {
    const { id } = req.params;
    const rooms = await Room.findById(id);
    if (!rooms) {
      res.status(404).send("No rooms found");
    }
    res.status(200).send(rooms);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getRooms = async (req, res, next) => {
  try {
    const rooms = await Room.find();
    if (!rooms) {
      res.status(404).send("No rooms found");
    }
    res.status(200).send(rooms);
  } catch (err) {
    next(err);
  }
};

module.exports = { createRoom, updateRoom, deletedRoom, getRoom, getRooms };
