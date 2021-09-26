const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const storeRoutes = require("./routes/store");
const userRoutes = require("./routes/users");
const app = express();
const path = require("path");
const cookieParser = require("cookie-parser");
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/store", storeRoutes);
app.use("/user", userRoutes);
app.use(express.static(path.join(__dirname, "dist")));
const mongoUri =
  "mongodb+srv://hanmanth95:Trade%23123@cluster0.crabp.mongodb.net/zenwrok?retryWrites=true&w=majority";
mongoose
  .connect(mongoUri, { useNewUrlParser: true })
  .then(function (db) {
    console.log("connected to mongoDb and server running on port 9400");
    app.listen(9400);
  })
  .catch(function (err) {
    console.log("mongodb connection error");
    console.log(err);
  });
