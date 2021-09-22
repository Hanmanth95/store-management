const Bills = require("../models/bills");
const Items = require("../models/items");
const async = require("async");

exports.buyItems = function (req, res) {
  console.log("buyItems called");
  console.log(req.body);
  var totalPrice = 0;
  async.each(
    req.body,
    function (billData, callback) {
      totalPrice += billData.price * billData.quantity;
      Items.findOne({ itemName: billData.itemName }, function (err, findRes) {
        if (findRes) {
          Items.updateOne(
            { itemName: billData.itemName },
            { sold: findRes.sold + billData.quantity },
            function (err, response) {
              console.log("updateOne response");
              console.log(response);
              callback();
            }
          );
        }
      });
    },
    function (err) {
      console.log("callback called");
      console.log(totalPrice);
      if (err) {
        return res.send({ status: "FAILED" });
      }
      const createBill = new Bills();
      createBill.billNumber =
        "BILL" + Math.floor(Math.random() * 90000) + 10000;
      createBill.price = totalPrice;
      createBill.date = new Date();
      createBill.save(function (err, resData) {
        if (err) {
          return res.send(err);
        }
        return res.send(resData);
      });
    }
  );
};

exports.getBills = function (req, res) {
  Bills.find({}, function (err, response) {
    if (err) {
      return res.send(err);
    }
    if (response) {
      return res.send(response);
    }
    return res.send({ status: "No Bills" });
  });
};

exports.deleteBills = function (req, res) {
  Bills.deleteMany({}, function (err, response) {
    if (err) {
      return res.send(err);
    }
    if (response) {
      return res.send(response);
    }
    return res.send({ status: "No Bills" });
  });
};

exports.getTodaySalesInfo = function (req, res) {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  console.log("start");
  console.log(start);
  console.log(end);
  Bills.aggregate(
    [
      { $match: { date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          todaySales: { $sum: "$price" },
        },
      },
    ],
    function (err, response) {
      console.log("getTodaySalesInfo response");
      console.log(response);
      return res.send(response);
    }
  );
};

exports.getMonthSalesInfo = function (req, res) {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setMonth(start.getMonth() - 1);
  start.setDate(start.getDate());
  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  console.log("start");
  console.log(start);
  console.log(end);
  Bills.aggregate(
    [
      { $match: { date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          monthSales: { $sum: "$price" },
        },
      },
    ],
    function (err, response) {
      console.log("getMonthSalesInfo response");
      console.log(response);
      return res.send(response);
    }
  );
};

exports.getYearSalesInfo = function (req, res) {
  var start = new Date();
  start.setUTCHours(0, 0, 0, 0);
  start.setFullYear(start.getFullYear() - 1);
  var end = new Date();
  end.setUTCHours(23, 59, 59, 999);
  console.log("start");
  console.log(start);
  console.log(end);
  Bills.aggregate(
    [
      { $match: { date: { $gte: start, $lte: end } } },
      {
        $group: {
          _id: null,
          yearSales: { $sum: "$price" },
        },
      },
    ],
    function (err, response) {
      console.log("getYearSalesInfo response");
      console.log(response);
      return res.send(response);
    }
  );
};

/* Bills.aggregate(
  [
    {
      $facet: {
        todaySales: [
          { $match: { date: { $gte: start, $lte: end } } },
          {
            $group: {
              _id: null,
              todaySales: { $sum: "$price" },
            },
          },
        ],
        monthSales: [
          { $match: { date: { $gte: startMonth, $lte: endMonth } } },
          {
            $group: {
              _id: null,
              monthSales: { $sum: "$price" },
            },
          },
        ],
        yearSales: [
          { $match: { date: { $gte: startYear, $lte: endYear } } },
          {
            $group: {
              _id: null,
              yearSales: { $sum: "$price" },
            },
          },
        ],
      },
    },
  ],
  function (err, response) {
    console.log("getTodaySalesInfo response");
    console.log(response);
    return res.send(response);
  }
); */
