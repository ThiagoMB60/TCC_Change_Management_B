const express = require("express");
const ctrIndex = express.Router();
const license = require('../functions/jwt');



ctrIndex.get("/", license.validaAutorizacao, async (req, res) => {
  // utils.msgSuccess(req.body.userId);
  // utils.msgWarning(res.locals.userType )
  return res.redirect("/change/list");
});


module.exports = ctrIndex;