const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
    
  file: {
    type: String
  },
  name: {
    type: String
  },
  products:
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
});

module.exports = mongoose.model('assignment', assignmentSchema);


