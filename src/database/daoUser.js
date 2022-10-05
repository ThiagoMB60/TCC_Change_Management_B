const CRUDdao = require('./CRUDdao')

module.exports = class DaoUser extends CRUDdao {
  constructor(objeto) {
    super(objeto);
    this.bdTabela = 'user';
    this.bdId = 'id';
    this.bdUser = 'user';
    this.bdPass = 'pass';
    this.bdMail = 'mail';
    this.bdType = 'type';
  }

  getParamsInsert() {
    return {
      [this.bdId]: this.obj.id,
      [this.bdUser]: this.obj.user,
      [this.bdPass]: this.obj.pass,
      [this.bdMail]: this.obj.mail,
      [this.bdType]: this.obj.type,
    }
  }

  getWhereClausesSearch() {

  }

}