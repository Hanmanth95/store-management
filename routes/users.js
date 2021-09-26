const express = require("express");
const UserController = require("../controllers/user.controller");
const router = express.Router();

router.route("/create").post(UserController.createUser);
router.route("/create/subuser").post(UserController.createSubUser);
router.route("/getAll").get(UserController.getUser);
router.route("/delete").get(UserController.deleteUsers);
router.route("/login").post(UserController.login);
router.route("/get/subusers").get(UserController.getAllSubUsers);
router.route("/update/subusers").post(UserController.updateSubUser);

module.exports = router;
