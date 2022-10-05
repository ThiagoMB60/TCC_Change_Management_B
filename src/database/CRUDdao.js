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
      this.empresa.razao = this.empresa.razao.toUpperCase();
      await database(this.bdTabela)
        .where({ [this.bdIdEmp]: this.empresa.id })
        .update({
          [this.bdCnpjEmp]: this.empresa.cnpj,
          [this.bdRazaoEmp]: this.empresa.razao,
          [this.bdAtivoEmp]: this.empresa.ativo,
          [this.bdCertEmp]: this.empresa.certificado
        })
        .then((result) => {
          if (result < 1) {
            throw "Alteração NÃO efetuada: Falha ao encontrar código da empresa."
          }
          this.resposta = `Empresa ${this.empresa.razao} alterada com sucesso!`;
        })
        .catch();
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }

  async deletar() {
    try {
      await database(this.bdTabela)
        .where({ [this.bdIdEmp]: this.empresa.id })
        .del()
        .then((result) => {
          if (result < 1) throw "Exclusão NÃO efetuada: Falha ao encontrar código da empresa.";
          this.resposta = `Empresa ${this.empresa.razao} excluida com sucesso!`;
        })
        .catch();
    } catch (error) {
      console.log(error);
      throw error;
    }
    return this.resposta;
  }
};
3