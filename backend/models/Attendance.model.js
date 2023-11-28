const mongoose = require('mongoose');

const AttendanceSchema = new mongoose.Schema({
  date: {
    type: Date,
  },
  products: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  Present: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  }],
});

module.exports = mongoose.model('attendance', AttendanceSchema);