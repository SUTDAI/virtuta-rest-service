const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors')

const app = express();
app.use(bodyParser.json());
app.use(cors())

const userRoute = require("./routes/users");

//routes
app.use("/user", userRoute);

module.exports = app;
