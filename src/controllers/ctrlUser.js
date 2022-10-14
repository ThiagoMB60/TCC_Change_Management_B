const jwt = require('jsonwebtoken')
const mdlUser = require('../models/mdlUser');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlUser = express.Router();

const tokenExpireTime = 24 * 3600; //hours * seconds per hour

ctrlUser.post('/login', async (req, res) => {
  let r = req.body;

  try {
    let user = new mdlUser('', r.user, r.pass);
    await user.buscarPorUsuario(); //busca usuário pelo 'user' no bd
    if (user.resposta.length > 0) { //se encontrar o usuário
      let userBd = user.resposta[0];

      if (!userBd.active) { //usuário existe mas inativo
        res.status(200).json({
          message: 'Este Usuário está inativo, contate um administrador para utilizar os serviços.',
          auth: false
        });
      }

      else if (user.pass !== utils.decrypt(userBd.pass, process.env.SECRET)) {
        res.status(200).json({ //usuário existe mas senha incorreta
          message: 'Usuário e/ou Senha inválidos',
          auth: false
        });
      }

      else { //usuário existe e é válido
        res.status(200).json({
          message: 'Usuário autenticado',
          auth: true,
          token: jwt.sign( //gera o token com o id, secret e o o tempo de validade
            { userId: userBd.id },
            process.env.SECRET,
            { expiresIn: tokenExpireTime }
          )
        });
      }
    } else { //se NÃO encontrar o usuário
      res.status(200).json({ //usuário existe mas senha incorreta
        message: 'Usuário e/ou Senha inválidos',
        auth: false
      });
    }
  } catch (error) {
    //console.log(error);
    res.status(400).json({
      message: `** ERROR!!! **: ${error}`,
      auth: false
    })
  }
})

module.exports = ctrlUser;