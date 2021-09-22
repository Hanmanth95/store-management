const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const itemRoutes = require("./routes/items");
const billRoutes = require("./routes/bill");
const app = express();
const path = require("path");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/items", itemRoutes);
app.use("/bills", billRoutes);
app.use(express.static(path.join(__dirname, "dist")));
const mongoUri =
  "mongodb+srv://hanmanth95:Trade%23123@cluster0.crabp.mongodb.net/billing-management?retryWrites=true&w=majority";
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(function (db) {
    console.log("connected to mongoDb and server running on port 7400");
    app.listen(7400);
  })
  .catch(function (err) {
    console.log("mongodb connecttion error");
    console.log(err);
  });
