const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const userBooking = require("./models/userBooking");
const roomData = require("./models/roomData");
dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO);
  } catch (error) {
    console.log(error);
  }
};

app.post("/bookRoom", async (req, res) => {
  const room = await roomData.find({
    startTime: req.body.startTime,
    date: req.body.date,
    bookingActive: true,
    roomType: req.body.roomType,
    roomNumber: req.body.roomNumber,
  });
  const room3 = await roomData.find({
    endTime: req.body.endTime,
    date: req.body.date,
    bookingActive: true,
    roomType: req.body.roomType,
    roomNumber: req.body.roomNumber,
  });

  const room2 = await roomData.find({
    startTime: req.body.startTime,
    endTime: req.body.endTime,
    date: req.body.date,
    bookingActive: false,
    roomType: req.body.roomType,
    roomNumber: req.body.roomNumber,
  });

  if (room.length > 0 || room3.length > 0) {
    res.send({ booked: false });
  } else {
    if (room2.length > 0) {
      room2.bookingActive = true;
      res.send({ booked: true });
    } else {
      const roomDetails = await new roomData({
        username: req.body.username,
        startTime: req.body.startTime,
        endTime: req.body.endTime,
        date: req.body.date,
        roomType: req.body.roomType,
        roomNumber: req.body.roomNumber,
        bookingActive: true,
      });
      try {
        let result = await roomDetails.save();
        const data = new userBooking(req.body);
        result = await data.save();
        res.send({ booked: true });
      } catch (error) {
        console.log(error);
      }
    }
  }
});

app.delete("/delete/:id", async (req, res) => {
  let result = await userBooking.deleteOne({ _id: req.params.id });

  result = await roomData.updateOne(
    { _id: req.params.id },
    {
      bookingActive: "false",
    }
  );
  res.send(result);
});

app.put("/update/:id", async (req, res) => {
  let result = await userBooking.updateOne(
    { _id: req.params.id },
    {
      $set: req.body,
    }
  );
  res.send(result);
});

app.get("/bookings", async (req, res) => {
  let booking = await roomData.find();
  if (booking.length > 0) {
    res.send(booking);
  } else {
    res.send({ result: "No Booking Find" });
  }
});

app.get("/search", async (req, res) => {
  const { first, second } = req.query;

  let query = {};
  if (first && second) {
    query = { $and: [{ roomType: first }, { roomNumber: second }] };
  } else if (first && second) {
    query = { $and: [{ startTime: first }, { endTime: second }] };
  } else {
    query = req.query;
  }
  let result = await roomData.find(query);
  res.send(result);
});

app.listen(8000, () => {
  connect();
  console.log("Listening");
});
