const express = require("express");
const ItemController = require("../controllers/item.controller");
const router = express.Router();

router.route("/save/item").post(ItemController.createItem);
router.route("/get/items").get(ItemController.getItems);
router.route("/delete/items").get(ItemController.deleteItems);

module.exports = router;
