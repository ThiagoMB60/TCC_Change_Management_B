const jwt = require('jsonwebtoken');
const utils = require('./utils')
require("dotenv").config();

module.exports = {
  validaAutorizacao(req, res, next) {
    //se houver um token na sessao
    if (!req.session.token) {
      utils.msgError('solicitação sem token')
      return res.render('login', { message: undefined });
    }

    jwt.verify(req.session.token, process.env.SECRET, (err, decoded) => {
      //se o token estiver ausente ou inválio
      if (err) return res.render('login', { message: 'Token de validação ausente ou inválido.' });
      res.locals.userId = decoded.userId;
      res.locals.userType = decoded.userType;
      //segue o fluxo da rota de origem
      next();
    });
  },
  authAdm(req, res, next) {
    jwt.verify(req.session.token, process.env.SECRET, (err, decoded) => {
      //se o token estiver ausente ou inválio
      if (err) return res.redirect('/user/login');
      if (decoded.userType != 'ADM') return res.redirect('/user/logout');
      res.locals.userId = decoded.userId;
      res.locals.userType = decoded.userType;
      //segue o fluxo da rota de origem
      //utils.msgWarning(decoded)
      next();
    });
  }
}
