const jwt = require('jsonwebtoken')
const mdlUser = require('../models/mdlUser');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlUser = express.Router();

const tokenExpireTime = 24 * 3600; //hours * seconds per hour

ctrlUser.post('/login', async (req, res) => {
  let r = req.body;
  let token;
  try {
    let user = new mdlUser('', r.user, r.pass);
    await user.buscarPorUsuario(); //busca usuário pelo 'user' no bd
    let userBd = user.resposta[0];
    if (!userBd.active) throw 'Este Usuário está inativo, contate um administrador para utilizar os serviços.'
    if (user.pass === utils.decrypt(userBd.pass, process.env.SECRET)) {
      token = jwt.sign(
        { userId: userBd.id },
        process.env.SECRET,
        { expiresIn: tokenExpireTime }
      )
    } else {
      throw 'Usuário e/ou Senha inválidos';
    }
    res.status(200).json({
      message: 'Usuário autenticado',
      auth: true,
      token: token
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      message: `** ERROR!!! **: ${error}`,
      auth: false
    })
  }
})

module.exports = ctrlUser;