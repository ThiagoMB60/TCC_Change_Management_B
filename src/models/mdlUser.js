const daoEntidade = require("../database/daoUser");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const utils = require("../functions/utils")
require("dotenv").config();



module.exports = class User extends CRUDModel {
  constructor(id, user, pass, mail, type, active) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;       //STRING UUID FORMAT
    this.user = user;   //STRING
    this.mail = mail;   //STRING
    this.pass = pass;   //STRING
    this.type = type;   //STRING
    this.active = active; //BOOLEAN
  }

  validaEntrada() {
    if (!this.user) throw 'Nome de usuário vazio ou Inválido.'
    if (!this.mail) throw 'Email informado vazio.'
    if (!this.pass) throw 'Senha vazia ou inválida.'
    if (!this.type) throw 'Tipo de usuário vazio ou inválido.'
    else this.pass = utils.crypt(this.pass, process.env.SECRET);

  }

  validaInserir() {
    try {
      this.validaEntrada();
      if (!this.active) this.active = true;
      this.id = uuidv4();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    //console.log(this)
  }

  tratamentoPosBusca() {
    if(this.resposta.length > 0){
      this.resposta.forEach(user => {
        user.pass = utils.decrypt(user.pass, process.env.SECRET);
      });
    }
  }

  validaAlterar() {
    return this.validaEntrada();
  }

  //exclusive routes
  async buscarPorUsuario() {
    if (!this.user) throw `Usuário e/ou Senha inválidos!`
    try {
      let daoInstance = new this.dao(this);
      this.resposta = await daoInstance.buscarPorUsuario();
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }
}