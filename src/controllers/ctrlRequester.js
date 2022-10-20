const jwt = require('jsonwebtoken')
const license = require('../functions/jwt');
const mdlRequester = require('../models/mdlRequester');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlRequester = express.Router();

ctrlRequester.get("/list", license.validaAutorizacao, async (req, res) => {
  return res.render("requesters", { session: req.session.token });
});


module.exports = ctrlRequester;