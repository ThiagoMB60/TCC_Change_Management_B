const express = require("express");
const controllerFront = express.Router();
const cookieParser = require("cookie-parser");
//const axios = require("axios");
const utils = require('../functions/utils')

const license = require("../functions/jwt");
const { axiosRequest } = require("../functions/utils");

controllerFront.use(cookieParser())

controllerFront.get("/", license.validaAutorizacao, (req, res) => {
  res.render("index");
});

controllerFront.get("/login", (req, res) => {
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
    trataResposta(response);
  }).catch(error => {
    alert('Usuário e/ou Senha inválidos.');
  })
});


module.exports = controllerFront;