const express = require("express");
const BillController = require("../controllers/bill.controller");
const router = express.Router();

router.route("/create/bill").post(BillController.buyItems);
router.route("/get/bills").get(BillController.getBills);
router.route("/delete/bills").get(BillController.deleteBills);
router.route("/get/today/sales").get(BillController.getTodaySalesInfo);
router.route("/get/month/sales").get(BillController.getMonthSalesInfo);
router.route("/get/year/sales").get(BillController.getYearSalesInfo);

module.exports = router;
