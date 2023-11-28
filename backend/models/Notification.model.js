const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
title: String,
  subject: String,
  image: String,
  date: String,
}, {
  timestamp: {
    type: Date,
    default: Date.now, 
  },
});

module.exports = notification = mongoose.model("notification", notificationSchema);