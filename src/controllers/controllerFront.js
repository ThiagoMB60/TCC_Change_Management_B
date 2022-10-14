const express = require("express");
const controllerFront = express.Router();
const cookieParser = require("cookie-parser");
const utils = require('../functions/utils');
const jwt = require('jsonwebtoken');
const cookies = require('js-cookies');
const axios = require('axios');
require("dotenv").config();

const license = require("../functions/jwt");

controllerFront.use(cookieParser())

controllerFront.get("/", license.validaAutorizacao, async (req, res) => {
  res.render("index");
});

controllerFront.get("/login", async (req, res) => {
  res.render("login");
});

controllerFront.post("/logar", async (req, res) => {
  let result;
  // await utils.axiosRequest(
  //   'POST',
  //   process.env.URL + '/user/login',
  //   { 'Content-Type': 'application/json' },
  //   {
  //     user: req.body.user,
  //     pass: req.body.pass
  //   }
  // ).then(response => {
  //   if (response.auth) { // se usuário autorizado     

  //     utils.msgError('AQUI *************************')
  //     jwt.verify(response.token, process.env.SECRET, (err, decoded) => {
  //       if (err) return res.redirect('application/login');
  //       //console.log(decoded)

  //       res.redirect('/');
  //       cookies.set('token', decoded.token, {
  //         expires: 1
  //       });
  //       cookies.set('userId', decoded.userId, {
  //         expires: 1
  //       });

  //     })
  //   } else { //user não autorizado vai para login page
  //     return res.redirect("login");
  //   }

  // }).catch(error => {
  utils.msgSuccess({ url: process.env.URL + '/user/login' })
  await axios.post({
    url: 'http://localhost:5000/user/login',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      user: req.body.user,
      pass: req.body.pass
    })
  }).then((response) => {
    console.log(response);
    result = response.data;
  }).catch((error) => {
    utils.msgError("catch do axios request")
    console.log(error);
    //return error;
  })
  utils.msgWarning(result);
  //console.log(error);
  res.redirect("login");
});



module.exports = controllerFront;