const database = require("./database");
const { msgError } = require("../functions/utils");
const utils = require("../functions/utils")

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

  getSelectFields() { return '*' };


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
        .select(this.getSelectFields())
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