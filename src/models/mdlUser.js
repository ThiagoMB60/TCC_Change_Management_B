const daoEntidade = require("../database/daoUser");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const functions = require("../functions/functions")
require("dotenv").config();



module.exports = class User extends CRUDModel {
  constructor(id, name, pass, mail) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;         //STRING UUID FORMAT
    this.name = name;     //STRING
    this.mail = mail;   //STRING
    this.pass = functions.crypt(pass, process.env.SECRET); //STRING
  }

  vali
}