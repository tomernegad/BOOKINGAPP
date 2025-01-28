const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");
const {
  verifyAdmin,
  verifyUser,
  verifyToken,
} = require("../utils/verifyToken");
const {
  createHotel,
  updatedHotel,
  deletedHotel,
  getHotel,
  getHotels,
  countByCity,
} = require("../controllers/hotelController");

//POST
router.post("/", verifyAdmin, createHotel);

//UPDATE
router.put("/:id", verifyAdmin, updatedHotel);

//DELETE
router.delete("/:id", verifyAdmin, deletedHotel);

//GET
router.get("/find/:id", getHotel);

// GET ALL
router.get("/", getHotels);

router.get("/countByCity", countByCity);
router.get("/countByType", getHotels);

module.exports = router;
