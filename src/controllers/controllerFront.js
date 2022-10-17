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
  // utils.msgSuccess(req.body.userId);
  // utils.msgWarning(res.locals.userType )
  res.render("index"), { userType: res.locals.userType };

});

controllerFront.get("/list", license.authAdm,async (req, res) => {
  await axios({
    method: 'post',
    url: process.env.URL + '/user/buscar',
    data: JSON.stringify({
      id : '',
      user : '',
      pass : '',
      mail : '',
      type : '',
      active : ''
    })
  }).then((users) =>{
    msgSuccess(users)
  }).catch(err=>{
    utils.msgError("catch do axios request: USERS")
    //console.log(err);
    res.redirect("/application/logout")
  })
  res.render("users", { userType: res.locals.userType });
});

controllerFront.get("/login", async (req, res) => {
  res.render("login");
});

controllerFront.post("/logar", async (req, res) => {
  //faz o request para o login
  await axios({
    method: 'post',
    url: process.env.URL + '/user/login',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      user: req.body.user,
      pass: req.body.pass
    })
  }).then((response) => {
    // console.log(response);
    //se login válido e autenticado
    if (response.data.auth) {
      jwt.verify(response.data.token, process.env.SECRET, (err, decoded) => {
        // utils.msgWarning(decoded);
        if (err) utils.msgError('Falha ao decodificar o token');
        //seta o id e tipo do usuario criptografado no navegador      
        res.cookie('user',
          utils.crypt(decoded.userId, process.env.SECRET));
        res.cookie('userType',
          utils.crypt(decoded.userType, process.env.SECRET));
      })
      //seta o token criptografado no navegador
      res.cookie('token',
        utils.crypt(response.data.token, process.env.SECRET));
      res.redirect("/application");
    } else {
      //direciona para o login
      res.redirect("/application/login");
    }
  }).catch((error) => {
    utils.msgError("catch do axios request: LOGAR")
    console.log(error);
    res.redirect("/application/login");
  })
  //console.log(error);
});

controllerFront.get("/logout", (req, res) => {
  // clear the cookies
  res.clearCookie("user");
  res.clearCookie("userType");
  res.clearCookie("token");
  // redirect to login
  res.redirect("/application/login");;
});



module.exports = controllerFront;