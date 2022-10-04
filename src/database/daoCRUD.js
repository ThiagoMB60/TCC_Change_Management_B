const database = require("../database/database");
const func = require("../functions/functions")

module.exports = class daCRUD {
  constructor(objeto) {
    this.bdTabela; //table name    
    this.resposta;  //resposta para o model
    this.obj = objeto; //
  }

  getParamsInsert() { };
  getWhereClausesSearch() { };
  getWhereRawClausesSearch() { };
  getKeyToUpdate() { };
  getParamsToUpdate() { };
  getKeyToDelete() { };


  async inserir() {
    try {
      await database
        .insert(this.getParamsInsert)
        .into(this.bdTabela)
        .then(() => this.resposta = `'${this.obj.constructor.name}' cadastrado com SUCESSO`)
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (error) {
      console.log(error)
      throw error;
    }
    return this.resposta;
  }

  async buscar() {
    let whereClauses = {};
    let whereRawClauses = "";

    if (this.empresa.id) whereClauses[this.bdIdEmp] = this.empresa.id;
    if (this.empresa.cnpj) whereClauses[this.bdCnpjEmp] = this.empresa.cnpj;
    if (this.empresa.razao) whereRawClauses = `${this.bdRazaoEmp} like '%${this.empresa.razao}%'`;
    if (this.empresa.ativo || this.empresa.ativo === 0) whereClauses[this.bdAtivoEmp] = this.empresa.ativo;

    try {
      await database
        .select()
        .into(this.bdTabela)
        .where(whereClauses)
        .whereRaw(whereRawClauses)
        .orderBy(this.bdRazaoEmp)
        .then((result) => this.resposta = result)
        .catch((err) => {
          console.log(err);
          throw err;
        });
    } catch (error) {
      console.log(error)
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