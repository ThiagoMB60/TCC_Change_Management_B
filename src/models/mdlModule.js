const daoEntidade = require("../database/daoModule");
const CRUDModel = require("./mdlCRUD");
const utils = require("../functions/utils")
require("dotenv").config();

module.exports = class Module extends CRUDModel {
  constructor(module, previous) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.module = module;   //STRING
    this.previous = previous; //STRING
  }

  validaEntrada() {
    if (!this.module) throw 'Nome do módulo vazio ou Inválido.'
  }

  validaInserir() {
    try {
      this.validaEntrada();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
  }

  validaAlterar() {
    return this.validaEntrada();
  }

  //exclusive routes

}