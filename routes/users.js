const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/login", userController.login);
router.get("/add", userController.add_user);
router.get("/remove", userController.remove_user);

module.exports = router;
