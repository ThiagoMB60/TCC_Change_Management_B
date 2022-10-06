const utils = require('../functions/functions')

module.exports = class CRUDModel {
  constructor(dao) {
    this.dao = dao;
    this.resposta;
  }

  validaInserir() { utils.msgWarning("Validação de INSERÇÃO executada da classe CRUD_GENÉRICA!", '\n', this) }
  validaBuscar() { utils.msgWarning("Validação de BUSCA executada da classe CRUD_GENÉRICA!", '\n', this) }
  validaAlterar() { utils.msgWarning("Validação de ALTERAÇÃO executada da classe CRUD_GENÉRICA!", '\n', this) }
  validaDeletar() { utils.msgWarning("Validação de EXCLUSÃO executada da classe CRUD_GENÉRICA!", '\n', this) }

  async inserir() {
    try {
      this.validaInserir();
      let daoInstance = new this.dao(this);
      this.resposta = await daoInstance.inserir()
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }

  async buscar() {
    try {
      this.validaBuscar();
      let daoInstance = new this.dao(this);
      this.resposta = await daoInstance.buscar();
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }

  async alterar() {
    try {
      this.validaAlterar();
      let daoInstance = new this.dao(this);
      this.resposta = await daoInstance.alterar()
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }

  async deletar() {
    try {
      this.validaDeletar();
      let daoInstance = new this.dao(this);
      this.resposta = await daoInstance.deletar()
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }


}

