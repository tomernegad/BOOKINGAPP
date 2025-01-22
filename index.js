const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const app = express();
const authRoute = require("./api/routes/auth");
const userRoute = require("./api/routes/users");
const hotelsRoute = require("./api/routes/hotels");
const roomsRoute = require("./api/routes/rooms");
dotenv.config();

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB);
    console.log("connected to mongodb");
    app.listen(8800, () => {
      console.log("connected to the application!");
    });
  } catch (error) {
    throw error;
  }
};

//middlewars

app.use(express.json());

app.use("/api/auth", authRoute);
app.use("/api/users", userRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);

app.get("/", (req, res) => {
  res.send("hello");
});

connect();
