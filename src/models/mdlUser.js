const daoEntidade = require("../database/daoUser");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const func = require("../functions/functions")
require("dotenv").config();



module.exports = class User extends CRUDModel {
  constructor(id, name, pass, mail) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;         //STRING UUID FORMAT
    this.name = name;     //STRING
    this.mail = mail;   //STRING
    this.pass = pass;
  }

  validaEntrada() {
    if (!this.name) throw 'Nome de usuário vazio ou Inválido.'
    if (!this.mail) throw 'Email informado vazio.'
    if (!this.pass) throw 'Senha vazia ou inválida.'
    else this.pass = func.crypt(this.pass, process.env.SECRET);
  }

  validaInserir() {
    try {
      this.validaEntrada();
      this.id = uuidv4();
      //console.log(this.constructor.name)
    } catch (error) {
      func.msgError(error);
      throw error;
    }
    //console.log(this)
  }

  validaAlterar() {
    return this.validaEntrada();
  }
}