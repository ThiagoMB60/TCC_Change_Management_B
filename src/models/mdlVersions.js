const daoEntidade = require("../database/daoVersion");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const utils = require("../functions/utils")
require("dotenv").config();



module.exports = class Version extends CRUDModel {
  constructor(id, version, date, module) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;             //STRING UUID FORMAT
    this.version = version;   //STRING
    this.date = date;         //DATE
    this.module = module;     //STRING
  }

  validaEntrada() {
    if (!this.version) throw 'Versão informada vazia ou Inválida.'
    if (!this.date) throw 'Data informada vazia ou inválida'
    if (!this.module) throw 'Módulo informado vazio ou inválido.'
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
    this.validaEntrada();
    if (!this.id) throw 'Id da versão informada vazia ou Inválida.';
    return;
  }

  //exclusive routes
}