const CRUDdao = require('./CRUDdao')
const utils = require('../functions/utils')
const database = require("./database");

module.exports = class DaoVersion extends CRUDdao {
  constructor(objeto) {
    super(objeto);
    this.bdTabela = 'requester';
    this.bdId = 'id';
    this.bdName = 'name';
    this.bdMail = 'mail';
    this.bdContact = 'contact';
    this.bdCompany = 'company';
    this.bdComments = 'comments';
  };

  getParamsInsert() {
    return {
      [this.bdId]: this.obj.id,
      [this.bdName]: this.obj.name,
      [this.bdMail]: this.obj.mail,
      [this.bdContact]: this.obj.contact,
      [this.bdCompany]: this.obj.company,
      [this.bdComments]: this.obj.comments
    }
  };

  getWhereClausesSearch() {
    let obj = {};
    if (this.obj.id) obj[this.bdId] = this.obj.id;
    return obj;
  };

  getWhereRawClausesSearch() {
    let rawClauses = "";
    if (this.obj.name) rawClauses += `${this.bdName} like '%${this.obj.name}%'`
    if (this.obj.company) {
      if (rawClauses !== "") rawClauses += " and ";
      rawClauses += `${this.bdCompany} like '%${this.obj.company}%'`
    }
    return rawClauses;
  };

  getOrderBy() { return this.bdName };

  getKeyToUpdate() {
    if (!this.obj.id) {
      utils.msgError(`Id para solicitante ${this.obj.name} não informado ou inválido.`);
      throw `Id para solicitante ${this.obj.name} não informado ou inválido.`;
    }
    return { [this.bdId]: this.obj.id }
  };

  getParamsToUpdate() {
    return {
      [this.bdName]: this.obj.name,
      [this.bdMail]: this.obj.mail,
      [this.bdContact]: this.obj.contact,
      [this.bdCompany]: this.obj.company,
      [this.bdComments]: this.obj.comments
    }
  };

  getKeyToDelete() {
    return { [this.bdId]: this.obj.id }
  };
}