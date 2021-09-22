var Items = require("../models/items");

exports.getItems = function (req, res) {
  Items.find({}, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    return res.send(response);
  });
};

exports.createItem = function (req, res) {
  console.log("createItem called");
  console.log(req.body);
  Items.findOne({ itemName: req.body.itemName }, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }

    if (!response) {
      const newItem = new Items();
      newItem.itemName = req.body.itemName;
      newItem.price = req.body.itemPrice;
      newItem.save(function (err, data) {
        console.log("save response");
        console.log(data);
        if (err) {
          return res.send({ status: "FAILED" });
        }
        return res.send(data);
      });
    } else {
      return res.send({ status: "Item Already Exists" });
    }
  });
};

exports.deleteItems = function (req, res) {
  Items.deleteMany({}, function (err, response) {
    console.log("response");
    console.log(response);
    if (err) {
      console.log(err);
      return res.send({ status: "FAILED" });
    }
    if (response) {
      return res.send(response);
    }
    return res.send({ status: "Item not found." });
  });
};
