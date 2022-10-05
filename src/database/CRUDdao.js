const database = require("./database");
const { msgError } = require("../functions/functions");
const utils = require("../functions/functions")

module.exports = class CRUDdao {
  constructor(objeto) {
    this.resposta;  //resposta para o model
    this.obj = objeto; //
  }

  getParamsInsert() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getWhereClausesSearch() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getWhereRawClausesSearch() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getKeyToUpdate() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getParamsToUpdate() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getKeyToDelete() {
    msgError('Método não implementado na classe filha.', this.constructor.name)
    throw `Método não implementado na classe filha. ${this.constructor.name}`
  };
  getOrderBy() { return };


  async inserir() {
    try {
      await database
        .insert(this.getParamsInsert())
        .into(this.bdTabela)
        .then(() => this.resposta = `'${this.obj.constructor.name}' cadastrado com SUCESSO`)
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

  async buscar() {
    try {
      await database
        .select()
        .into(this.bdTabela)
        .where(this.getWhereClausesSearch())
        .whereRaw(this.getWhereRawClausesSearch())
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

  async alterar() {
    try {
      await database(this.bdTabela)
        .where(this.getKeyToUpdate())
        .update(this.getParamsToUpdate())
        .then((result) => {
          if (result < 1) {
            throw "Alteração NÃO efetuada: Falha ao encontrar Id"
          }
          this.resposta = `Alteração efetuada com sucesso!`;
        })
        .catch();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    return this.resposta;
  }

  async deletar() {
    try {
      await database(this.bdTabela)
        .where(this.getKeyToDelete())
        .del()
        .then((result) => {
          if (result < 1) throw "Exclusão NÃO efetuada: Falha ao encontrar Id.";
          this.resposta = `Exclusão efetuada com sucesso!`;
        })
        .catch();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    return this.resposta;
  }
};
3