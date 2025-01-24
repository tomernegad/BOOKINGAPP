const express = require("express");
const router = express.Router();
const User = require("../models/User");
const createError = require("../utils/error");
const verifyToken = require("../utils/verifyToken");

const {
  updatedUser,
  deletedUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

router.get("/checkauthentication", verifyToken, (req, res, next) => {
  res.send("Hello user, you are logged in");
});

//UPDATE
router.put("/:id", updatedUser);

//DELETE
router.delete("/:id", deletedUser);

//GET
router.get("/:id", getUser);

// GET ALL
router.get("/", getUsers);

module.exports = router;
