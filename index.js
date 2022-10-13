const func = require('./src/functions/utils')
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
const jsonParser = bodyParser.json();

const router = require("./router");

const port = 5000;

app.use("/", jsonParser, router);

app.listen(port, async function (erro) {
  let time = new Date().toLocaleString();

  if (!erro) func.msgSuccess(`Gerenciador de mudanças iniciado com SUCESSO! -${time}`);
  else func.msgError(`ERROR: Falha ao inciar aplicação. ${time}\n\n${erro}`);
});