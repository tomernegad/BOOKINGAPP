const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");
const createError = require("../utils/error");
const {
  createHotel,
  updatedHotel,
  deletedHotel,
  getHotel,
  getHotels,
} = require("../controllers/hotelController");

//POST
router.post("/", createHotel);

//UPDATE
router.put("/:id", updatedHotel);

//DELETE
router.delete("/:id", deletedHotel);

//GET
router.get("/:id", getHotel);

// GET ALL
router.get("/", getHotels);

module.exports = router;
