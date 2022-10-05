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
    let obj = {};
    if (this.obj.id) obj[this.bdId] = this.obj.id;
    if (this.obj.mail) obj[this.bdMail] = this.obj.mail;
    if (this.obj.type) obj[this.bdType] = this.obj.type;
    return obj;
  }

  getWhereRawClausesSearch() {
    if (this.obj.user) return `${this.bdUser} like '%${this.obj.user}%'`
    else return "";
  }

  getParamsToUpdate() { }

  getKeyToDelete() { };

  getKeyToUpdate() { };
}