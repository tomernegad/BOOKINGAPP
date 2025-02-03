const express = require("express");
const router = express.Router();
const Room = require("../models/Room");
const createError = require("../utils/error");
const {
  verifyAdmin,
  verifyUser,
  verifyToken,
} = require("../utils/verifyToken");
const {
  createRoom,
  updateRoom,
  deletedRoom,
  getRoom,
  getRooms,
  updateRoomAvailability,
} = require("../controllers/roomController");

//POST
router.post("/:hotelid", verifyAdmin, createRoom);

//UPDATE
router.put("/:id", verifyAdmin, updateRoom);

router.put("/availability/:id", updateRoomAvailability);

//DELETE
router.delete("/:id/:hotelid", verifyAdmin, deletedRoom);

//GET
router.get("/:id", getRoom);

// GET ALL
router.get("/", getRooms);

module.exports = router;
