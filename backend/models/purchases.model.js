const mongoose = require("mongoose");

const purchasesSchema = new mongoose.Schema({
  products:[ 
    {
    type: mongoose.Schema.Types.ObjectId,
    ref: "products",
    required: true,
    index: true 
  }
],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
    index: true
  },
  purchaseDate: {
    type: Date,
    default: Date.now,
  },
});

// purchasesSchema.index({ user: 1, products: 1 }, { unique: true });

module.exports = mongoose.model("Purchase", purchasesSchema);
