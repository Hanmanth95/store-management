const express = require("express");
const StoreController = require("../controllers/store.controller");
const router = express.Router();

router.route("/create/store").post(StoreController.createStore);
router.route("/getall/stores").get(StoreController.getAllStores);
router.route("/get").get(StoreController.getUserStores);
router.route("/delete/stores").get(StoreController.deleteStores);
router.route("/update/store").post(StoreController.updateStore);

module.exports = router;
