const jwt = require('jsonwebtoken');
const utils = require('./utils')
require("dotenv").config();

module.exports = {
  validaAutorizacao(req, res, next) {
    let token;
    //se houver um token nos cookies
    if (req.cookies.token) 
      //decodifica o token armazenado no navegador 
      token = utils.decrypt(req.cookies.token, process.env.SECRET) 

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      //se o token estiver ausente ou inválio
      if (err) return res.redirect('application/login'); 
      req.body.userId = decoded.userId;
      //segue o fluxo da rota de origem
      next(); 
    });
  }
}
