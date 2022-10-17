const jwt = require('jsonwebtoken')
const license = require('../functions/jwt');
const mdlUser = require('../models/mdlUser');
const utils = require('../functions/utils');
require("dotenv").config();

const express = require("express");
const { msgWarning } = require('../functions/utils');
const ctrlUser = express.Router();

const tokenExpireTime = 24 * 3600; //hours * seconds per hour

ctrlUser.post('/login', async (req, res) => {
  let r = req.body;

  try {
    let user = new mdlUser('', r.user, r.pass);
    await user.buscarPorUsuario(); //busca usuário pelo 'user' no bd
    if (user.resposta.length < 1) { //se não encontrar um usuário com o username
      res.render('login', {message: 'Usuário e/ou Senha inválidos.'})
      return;
    }

    let userBd = user.resposta[0];

    if (!userBd.active) { //usuário existe mas inativo
      res.status(403).json({
        message: 'Este Usuário está inativo, contate um administrador para utilizar os serviços.',
        auth: false
      });
    }

    else if (user.pass !== utils.decrypt(userBd.pass, process.env.SECRET)) {
      res.status(401).json({ //usuário existe mas senha incorreta
        message: 'Usuário e/ou Senha inválidos',
        auth: false
      });
    }

    else { //usuário existe e é válido
      res.status(200).json({
        message: 'Usuário autenticado',
        auth: true,
        token: jwt.sign( //gera o token com o id, secret e o o tempo de validade
          { userId: userBd.id, userType: userBd.type},
          process.env.SECRET,
          { expiresIn: tokenExpireTime }
        )
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


// -------------------------------------------------------------------------

ctrlUser.get("/", license.validaAutorizacao, async (req, res) => {
  // utils.msgSuccess(req.body.userId);
  // utils.msgWarning(res.locals.userType )
  res.render("index"), { userType: res.locals.userType };

});

ctrlUser.get("/list", license.authAdm,async (req, res) => {
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
    res.redirect("/user/logout")
  })
  res.render("users", { userType: res.locals.userType });
});

ctrlUser.get("/login", async (req, res) => {
  res.render("login", {message: undefined});
});

ctrlUser.post("/logar", async (req, res) => {
  //faz o request para o login
  await axios({
    method: 'post',
    url: process.env.URL + '/user/login',
    headers: { 'Content-Type': 'user/json' },
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
        res.session('user',
          utils.crypt(decoded.userId, process.env.SECRET));
        res.session('userType',
          utils.crypt(decoded.userType, process.env.SECRET));
      })
      //seta o token criptografado no navegador
      res.session('token',
        utils.crypt(response.data.token, process.env.SECRET));
      res.redirect("/user");
    } else {
      //direciona para o login
      res.redirect("/user/login");
    }
  }).catch((error) => {
    utils.msgError("catch do axios request: LOGAR")
    console.log(error);
    res.redirect("/user/login");
  })
  //console.log(error);
});

ctrlUser.get("/logout", (req, res) => {
  // clear the sessions
  res.session = undefined;
  // redirect to login
  res.redirect("/user/login");
});
module.exports = ctrlUser;