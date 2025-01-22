const express = require("express");
const router = express.Router();
const Hotel = require("../models/Hotel");

//POST
router.post("/", async (req, res) => {
  const newHotel = new Hotel(req.body);
  try {
    const savedHotel = await newHotel.save();
    if (!savedHotel) {
      res.status(500).send("failed to post the hotel");
    }
    res.status(200).send(savedHotel);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

//UPDATE
router.put("/:id", async (req, res) => {
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
    res.status(500).send(err);
    console.log(err);
  }
});

//DELETE
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedHotel = await Hotel.findByIdAndDelete(id);
    if (!deletedHotel) {
      res.status(404).send("Did not found hotel do delete");
    }
    res.status(200).send(deletedHotel);
  } catch (err) {
    res.status(500).send(err);
    console.log(err);
  }
});

module.exports = router;
