const func = require('./src/functions/functions')
const express = require("express");
const app = express();

const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();

const router = require("./router");

const port = 5000;

app.use("/", jsonParser, router);

app.listen(port, async function (erro) {
  let time = new Date().toLocaleString();

  if (!erro) console.log(func.msgColor('green'), `Gerenciador de mudanças iniciado com SUCESSO! -${time}`);
  else console.log(func.msgColor('red'), `ERROR: Falha ao inciar aplicação. ${time}\n\n${erro}`);
});