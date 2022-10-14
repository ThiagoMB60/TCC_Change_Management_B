const jwt = require('jsonwebtoken');
const utils = require('./utils')
require("dotenv").config();



module.exports = {
  validaAutorizacao(req, res, next) {
    let token;
    if (req.cookies.token) //se houver um token nos cookies
      token = utils.decrypt(req.cookies.token, process.env.SECRET) //decodifica o token armazenado no navegador 
    //else token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.redirect('application/login'); //se o token estiver ausente ou inválio
      req.userId = decoded.userId;
      next(); //segue o fluxo da rota de origem
    });
  }
}
