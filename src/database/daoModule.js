const CRUDdao = require('./CRUDdao')
const utils = require('../functions/utils')
const database = require("./database");

module.exports = class DaoModule extends CRUDdao {
  constructor(objeto) {
    super(objeto);
    this.bdTabela = 'module';
    this.bdId = 'id';
    this.bdModule = 'name';
    this.bdPass = 'pass';
    this.bdMail = 'mail';
    this.bdType = 'type';
    this.bdActive = 'active';
  }

  getParamsInsert() {
    return {
      [this.bdId]: this.obj.id,
      [this.bdModule]: this.obj.user,
      [this.bdPass]: this.obj.pass,
      [this.bdMail]: this.obj.mail,
      [this.bdType]: this.obj.type,
      [this.bdActive]: this.obj.active
    }
  }

  // getSelectFields() {
  //   return [this.bdId, this.bdModule, this.bdMail, this.bdType, this.bdActive]
  // };

  getOrderBy() { return this.bdModule };

  getWhereClausesSearch() {
    let obj = {};
    if (this.obj.id) obj[this.bdId] = this.obj.id;
    if (this.obj.mail) obj[this.bdMail] = this.obj.mail;
    if (this.obj.type) obj[this.bdType] = this.obj.type;
    if (this.obj.active || this.obj.active === false) obj[this.bdActive] = this.obj.active;
    return obj;
  }

  getWhereRawClausesSearch() {
    if (this.obj.user) return `${this.bdModule} like '%${this.obj.user}%'`
    else return "";
  }
  getKeyToUpdate() {
    if (!this.obj.id) {
      utils.msgError(`Id para usuário${this.obj.user}não informado ou inválido.`);
      throw `Id para usuário${this.obj.user}não informado ou inválido.`;
    }
    return { [this.bdId]: this.obj.id }
  };

  getParamsToUpdate() {
    return {
      [this.bdModule]: this.obj.user,
      [this.bdPass]: this.obj.pass,
      [this.bdMail]: this.obj.mail,
      [this.bdType]: this.obj.type,
      [this.bdActive]: this.obj.active
    }
  }

  getKeyToDelete() {
    return { [this.bdId]: this.obj.id }
  };

  //exclusive routes

  async buscarPorUsuario() {
    try {
      await database
        .select()
        .into(this.bdTabela)
        .where({ [this.bdModule]: this.obj.user })
        .then((result) => this.resposta = result)
        .catch((err) => {
          utils.msgError(err);
          throw err;
        });
    } catch (error) {
      utils.msgError(error)
      throw error;
    }
    return this.resposta;
  }

}