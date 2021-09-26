var Store = require("../models/store");

exports.getAllStores = function (req, res) {
  Store.find({}, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    return res.send({ status: "SUCCESS", data: response });
  });
};

exports.getUserStores = function (req, res) {
  Store.find({ companyId: req.cookies.token }, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    return res.send({ status: "SUCCESS", data: response });
  });
};

exports.createStore = function (req, res) {
  Store.findOne({ name: req.body.name }, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }

    if (!response) {
      const newItem = new Store();
      newItem.name = req.body.name;
      newItem.location = req.body.location;
      newItem.mobile = req.body.mobile;
      newItem.companyId = req.cookies.token;
      newItem.save(function (err, data) {
        if (err) {
          return res.send(err);
        }
        return res.send({ status: "SUCCESS", data: data });
      });
    } else {
      return res.send({ status: "FAILED", Message: "Store Already Exists" });
    }
  });
};

exports.deleteStores = function (req, res) {
  Store.deleteMany({}, function (err, response) {
    if (err) {
      return res.send({ status: "FAILED" });
    }
    if (response) {
      return res.send({ status: "SUCCESS", data: response });
    }
    return res.send({ status: "FAILED", Message: "Item not found." });
  });
};

exports.updateStore = function (req, res) {
  if (req.body) {
    Store.findOneAndUpdate(
      {
        name: req.body.oldName,
        companyId: req.cookies.token,
      },
      {
        name: req.body.name,
        location: req.body.location,
        mobile: req.body.mobile,
      },
      null,
      function (err, response) {
        if (err) {
          return err;
        }
        return res.send({ status: "SUCCESS", data: response });
      }
    );
  } else {
    return res.send({ status: "FAILED", Message: "Request Object Not Found" });
  }
};
