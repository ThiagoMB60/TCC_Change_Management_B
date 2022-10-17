const jwt = require('jsonwebtoken')
const license = require('../functions/jwt');
const mdlUser = require('../models/mdlUser');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const ctrlUser = express.Router();

const tokenExpireTime = 24 * 3600; //hours * seconds per hour

ctrlUser.post('/login', async (req, res) => {
  try {
    let user = new mdlUser('', req.body.user, req.body.pass);
    await user.buscarPorUsuario(); //busca usuário pelo 'user' no bd
    if (user.resposta.length < 1) { //se não encontrar um usuário com o username
      return res.render('login', { message: 'Usuário e/ou Senha inválidos.' })
    }
    let userBd = user.resposta[0];
    if (!userBd.active) { //usuário existe mas inativo
      return res.render(
        'login',
        { message: 'Este Usuário está inativo, contate um administrador para utilizar os serviços.' }
      )
    }
    else if (user.pass !== utils.decrypt(userBd.pass, process.env.SECRET)) {
      return res.render('login', { message: 'Usuário e/ou Senha inválidos.' })
    }
    else { //usuário existe e é válido
      req.session.token = jwt.sign( //gera o token com o id, userType, secret e o o tempo de validade
        { userId: userBd.id, userType: userBd.type },
        process.env.SECRET,
        { expiresIn: tokenExpireTime }
      )
      return res.redirect("/");
    }

  } catch (error) {
    utils.msgError(error);
    return res.render('login', { message: undefined })
  }
})


// -------------------------------------------------------------------------

ctrlUser.get("/", license.validaAutorizacao, async (req, res) => {
  // utils.msgSuccess(req.body.userId);
  // utils.msgWarning(res.locals.userType )
  return res.render("index"), { userType: res.locals.userType };
});

ctrlUser.get("/list", license.authAdm, async (req, res) => {
  let users = await new mdlUser().buscar();
  console.log(arrUsers);
  res.render("users", { arrUsers: arrUsers });
});

ctrlUser.get("/login", async (req, res) => {
  res.render("login", { message: undefined });
});

ctrlUser.get("/logout", (req, res) => {
  // clear the sessions
  req.session = undefined;
  // redirect to login
  res.render("login", { message: undefined });
});
module.exports = ctrlUser;