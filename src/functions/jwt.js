const jwt = require('jsonwebtoken');
require("dotenv").config();



module.exports = {
  validaAutorizacao(req, res, next) {
    let token;
    if (req.cookies.token) token = req.cookies.token //se houver um token nos cookies
    //else token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.redirect('application/login'); //se o token estiver ausente ou inválio
      req.userId = decoded.userId;
      next(); //segue o fluxo da rota de origem
    });
  }
}
