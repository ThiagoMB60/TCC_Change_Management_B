const express = require("express");
const controllerFront = express.Router();
const cookieParser = require("cookie-parser");

const license = require("../functions/jwt");

controllerFront.use(cookieParser())

controllerFront.get("/", license.validaAutorizacao, (req, res) => {
  res.render("index");
});


module.exports = controllerFront;