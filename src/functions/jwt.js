const jwt = require('jsonwebtoken');
const utils = require('./utils')
require("dotenv").config();

module.exports = {
  validaAutorizacao(req, res, next) {
    //se houver um token na sessao
    if (!req.session.token){
      return res.redirect('user/logout');
    }
      //decodifica o token armazenado no navegador 
    let token = utils.decrypt(req.session.token, process.env.SECRET)

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      //se o token estiver ausente ou inválio
      if (err) return res.redirect('user/logout');
      res.locals.userId = decoded.userId;
      res.locals.userType = decoded.userType;
      //segue o fluxo da rota de origem
      next();
    });
  },
  authAdm(req, res, next){ 
    let token;
    //se houver um token nos session
    if (req.session){
      //decodifica o token armazenado no navegador 
      token = utils.decrypt(req.session.token, process.env.SECRET);
    }    

    jwt.verify(token, process.env.SECRET, (err, decoded) => {      
      //se o token estiver ausente ou inválio
      if (err) return res.redirect('application/login');
      if (decoded.userType != 'ADM') return res.redirect('application/logout');
      res.locals.userId = decoded.userId;
      res.locals.userType = decoded.userType;
      //segue o fluxo da rota de origem
      //utils.msgWarning(decoded)
      next();
    });
  }
}
