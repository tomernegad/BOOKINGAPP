const User = require("../models/User");

const updatedUser = async (req, res, next) => {
  try {
    const id = req.params.id;
    const updatedUser = await User.findByIdAndUpdate(
      id,
      { $set: req.body },
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).send("The user to update was not found");
    }
    res.status(200).send(updatedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const deletedUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).send("Did not find user to delete");
    }
    res.status(200).send(deletedUser);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const users = await User.findById(id);
    if (!users) {
      return res.status(404).send("No users found");
    }
    res.status(200).send(users);
  } catch (err) {
    console.log(err);
    next(err);
  }
};

const getUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    if (!users) {
      res.status(404).send("No users found");
    }
    res.status(200).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  updatedUser,
  deletedUser,
  getUser,
  getUsers,
};
