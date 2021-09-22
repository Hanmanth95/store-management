const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  itemName: String,
  price: Number,
  sold: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Item", itemSchema);
