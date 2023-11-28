const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema({
  products:[ 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
  }
],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

module.exports = mongoose.model("Teacher", teacherSchema);
