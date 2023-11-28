const mongoose = require('mongoose');

const resultSchema = new mongoose.Schema({
    
  score: {
    type: Number
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model('Result', resultSchema);


