const express = require("express");
const userController = require("../controllers/user-controller");

const router = express.Router();

router.get("/add", userController.add_user);

module.exports = router;
