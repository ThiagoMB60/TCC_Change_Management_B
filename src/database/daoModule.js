const CRUDdao = require('./CRUDdao')
const utils = require('../functions/utils')
const database = require("./database");

module.exports = class DaoModule extends CRUDdao {
  constructor(objeto) {
    super(objeto);
    this.bdTabela = 'module';
    this.bdModule = 'module';
  }

  getParamsInsert() {
    return {
      [this.bdModule]: this.obj.module,
    }
  }

  // getSelectFields() {
  //   return [this.bdId, this.bdModule, this.bdMail, this.bdType, this.bdActive]
  // };

  getOrderBy() { return this.bdModule };

  getWhereClausesSearch() {
    return {};
  }

  getWhereRawClausesSearch() {
    if (this.obj.module) return `${this.bdModule} like '%${this.obj.module}%'`
    else return "";
  }
  getKeyToUpdate() {
    if (!this.obj.module) {
      utils.msgError(`Módulo ${this.obj.module} não informado ou inválido.`);
      throw `Módulo ${this.obj.module} não informado ou inválido.`;
    }
    return { [this.bdModule]: this.obj.module }
  };

  getParamsToUpdate() {
    return {
      [this.bdModule]: this.obj.module
    }
  }

  getKeyToDelete() {
    return { [this.bdModule]: this.obj.module }
  };

  //exclusive routes


}