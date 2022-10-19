const daoEntidade = require("../database/daoRequester");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const utils = require("../functions/utils")
require("dotenv").config();



module.exports = class Requester extends CRUDModel {
  constructor(id, name, mail, contact, company, comments) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;       //STRING UUID FORMAT
    this.name = name;   //STRING
    this.mail = mail;   //STRING
    this.contact = contact;   //STRING
    this.company = company; //STRING
    this.comments = comments;   //STRING
  }

  validaEntrada() {
    if (!this.name) throw 'Nome de usuário vazio ou Inválido.'
    if (!this.mail) throw 'Email informado vazio.'
    if (!this.contact) throw 'Contato com o usuário vazio ou inválido.'
  }

  validaInserir() {
    try {
      this.validaEntrada();
      this.id = uuidv4();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    //console.log(this)
  }


  validaAlterar() {
    return this.validaEntrada();
  }

  //exclusive routes
}