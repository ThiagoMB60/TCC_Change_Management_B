const CRUDdao = require('./CRUDdao')
const utils = require('../functions/utils')
const database = require("./database");

module.exports = class DaoVersion extends CRUDdao {
  constructor(objeto) {
    super(objeto);
    this.bdTabela = 'moduleversions';
    this.bdId = 'id';
    this.bdVersion = 'version';
    this.bdDate = 'date';
    this.bdModule = 'module';
  };

  getParamsInsert() {
    return {
      [this.bdId]: this.obj.id,
      [this.bdVersion]: this.obj.version,
      [this.bdDate]: this.obj.date,
      [this.bdModule]: this.obj.module,
    }
  };

  getWhereClausesSearch() {
    let obj = {};
    if (this.obj.id) obj[this.bdId] = this.obj.id;
    if (this.obj.version) obj[this.bdVersion] = this.obj.version;
    if (this.obj.module) obj[this.bdModule] = this.obj.module;
    return obj;
  };

  getWhereRawClausesSearch() {
    return "";
  };

  getOrderBy() {
    return {
      column: [this.bdModule],
      column: [this.bdDate]
    }
  };

  getKeyToUpdate() {
    if (!this.obj.id) {
      utils.msgError(`Id para versão ${this.obj.version} não informado ou inválido.`);
      throw `Id para versão ${this.obj.version} não informado ou inválido.`;
    }
    return { [this.bdId]: this.obj.id }
  };

  getParamsToUpdate() {
    return {
      [this.bdVersion]: this.obj.version,
      [this.bdDate]: this.obj.date,
      [this.bdModule]: this.obj.module,
    }
  };

  getKeyToDelete() {
    if (!this.obj.id) {
      utils.msgError(`Id para versão ${this.obj.version} não informado ou inválido.`);
      throw `Id para versão ${this.obj.version} não informado ou inválido.`;
    }
    return { [this.bdId]: this.obj.id }
  };
}