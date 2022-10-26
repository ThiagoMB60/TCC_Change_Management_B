const jwt = require('jsonwebtoken')
const license = require('../functions/jwt');
const mdlModule = require('../models/mdlModule');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlModule = express.Router();

ctrlModule.get("/list", license.validaAutorizacao, async (req, res) => {
  let modules = await new mdlModule().buscar();
  return res.render("modules", {
    session: req.session.token,
    modules: modules
  });
});


module.exports = ctrlModule;