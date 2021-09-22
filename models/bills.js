const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const billsSchema = new Schema({
  billNumber: String,
  price: Number,
  date: Date,
});

module.exports = mongoose.model("Bill", billsSchema);
