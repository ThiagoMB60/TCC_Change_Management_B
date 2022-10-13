const express = require("express");
const controllerFront = express.Router();
const cookieParser = require("cookie-parser");
const utils = require('../functions/utils');
const jwt = require('jsonwebtoken');
const cookies = require('js-cookies');
require("dotenv").config();

const license = require("../functions/jwt");
const { axiosRequest, msgError } = require("../functions/utils");

controllerFront.use(cookieParser())

controllerFront.get("/", license.validaAutorizacao, async (req, res) => {
  res.render("index");
});

controllerFront.get("/login", async (req, res) => {
  res.render("login");
});

controllerFront.post("/logar", async (req, res) => {
  await axiosRequest(
    'POST',
    'http://localhost:5000/user/login',
    { 'Content-Type': 'application/json' },
    {
      user: req.body.user,
      pass: req.body.pass
    }
  ).then(response => {
    if(response.auth){ // se usuário autorizado     
      
    msgError('AQUI *************************')
      jwt.verify(response.token, process.env.SECRET,(err, decoded) =>{
        if (err) return res.redirect('/login');
        //console.log(decoded)

        res.redirect('/');
        cookies.set('token', decoded.token, {
          expires: 1
        });
        cookies.set('userId', decoded.userId, {
          expires: 1
        });

      })
    }else{ //user não autorizado vai para login page
      return res.redirect("login");
    }

  }).catch(error => {
    
    msgError(' erro AQUI *************************')
    console.log(error);
    res.redirect("login");
  })
});


module.exports = controllerFront;