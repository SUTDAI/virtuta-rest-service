const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.post("/login", userController.login);
router.post("/add", userController.add_user);
router.post("/remove", userController.remove_user);

module.exports = router;
