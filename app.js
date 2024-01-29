const express = require("express");
const bodyParser = require("body-parser");

const app = express();

const userRoute = require("./routes/users");

app.use(bodyParser.json());

//routes
app.use("/user", userRoute);

module.exports = app;
