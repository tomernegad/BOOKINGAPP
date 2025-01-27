const express = require("express");
const router = express.Router();
const User = require("../models/User");
const createError = require("../utils/error");
const {
  verifyToken,
  verifyUser,
  verifyAdmin,
} = require("../utils/verifyToken");

const {
  updatedUser,
  deletedUser,
  getUser,
  getUsers,
} = require("../controllers/userController");

// router.get("/checkauthentication", verifyToken, (req, res, next) => {
//   res.send("Hello user, you are logged in");
// });

// router.get("/checkuser/:id", verifyUser, (req, res, next) => {
//   res.send("Hello user, you are logged in and you can delete your account");
// });

// router.get("/checkadmin/:id", verifyAdmin, (req, res, next) => {
//   res.send("Hello admin, you are logged in and you can delete all accounts");
// });

//UPDATE
router.put("/:id", verifyUser, updatedUser);

//DELETE
router.delete("/:id", verifyUser, deletedUser);

//GET
router.get("/:id", verifyUser, getUser);

// GET ALL
router.get("/", verifyAdmin, getUsers);

module.exports = router;
