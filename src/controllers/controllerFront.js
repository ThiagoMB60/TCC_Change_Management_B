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
  
  await axios({ //realiza o login
    method: 'post',
    url: process.env.URL + '/user/login',
    headers: { 'Content-Type': 'application/json' },
    data: JSON.stringify({
      user: req.body.user,
      pass: req.body.pass
    })
  }).then((response) => { 
    // console.log(response);
    if(response.data.auth){  //se login válido e autenticado
      jwt.verify(response.data.token, process.env.SECRET, (err, decoded)=>{
        if (err) utils.msgError('Falha ao decodificar o token');        
        res.cookie('user', 
          utils.crypt(decoded.userId, process.env.SECRET)); //seta o id do usuario criptografado no navegador
      }) 
      res.cookie('token', 
        utils.crypt(response.data.token, process.env.SECRET)); //seta o token criptografado no navegador
      res.redirect("/application");
    }else{
      res.redirect("/application/login"); //direciona para o login
    }
  }).catch((error) => {
    utils.msgError("catch do axios request")
    console.log(error);
    //return error;
  })
  //console.log(error);
});



module.exports = controllerFront;