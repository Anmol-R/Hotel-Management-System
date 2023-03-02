const mongoose = require("mongoose");

const room = mongoose.Schema({
  username: {
    type: String,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  date: {
    type: String,
  },
  roomType: {
    type: String,
  },
  roomNumber: {
    type: Number,
  },
  bookingActive: {
    type: String,
  },
});

module.exports = mongoose.model("roomData", room);
