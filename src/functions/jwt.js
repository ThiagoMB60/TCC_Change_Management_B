const jwt = require('jsonwebtoken');
require("dotenv").config();

module.exports = {
  validaAutorizacao(req, res, next) {
    const token = req.headers['x-access-token'];
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
      if (err) return res.status(401)
        .json({ message: 'O Usuário não possui autorização para utilizar este recurso. Contate um administrador.' })
        .end(); //token invalido ou ausente
      req.userId = decoded.userId;
      next();
    });
  }
}
