const license = require('../functions/jwt');
const mdlChange = require('../models/mdlChange');
const mdlRequester = require('../models/mdlRequester');
const mdlUser = require('../models/mdlUser');
const mdlModule = require('../models/mdlModule');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlChange = express.Router();

ctrlChange.get("/list", license.validaAutorizacao, async (req, res) => {
  // let changes = await new mdlChange().buscar();
  let requesters = await new mdlRequester().buscar();
  let modules = await new mdlModule().buscar();

  requesters.sort(function (a, b) {
    return a.company < b.company ? -1 : a.company > b.company ? 1 : 0;
  });

  return res.render("changeSection", {
    session: req.session.token,
    // arrUsers: users,
    arrRequesters: requesters,
    arrModules: modules,
    userType: res.locals.userType,
    userId: res.locals.userId
  });
});


module.exports = ctrlChange;