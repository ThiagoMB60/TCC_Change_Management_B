const database = require("./database");
const utils = require("../functions/utils")

module.exports = class DaoChange {
  constructor(objeto) {
    this.obj = objeto;
    this.resposta;  //resposta para o model

    this.bdTableName = 'change';
    this.bdId = 'id';
    this.bdTitle = 'title';
    this.bdRequester = 'requester';
    this.bdBenefits = 'benefits';
    this.bdNotImpEffects = 'not_imp_effec';
    this.bdType = 'change_type';
    this.bdModule = 'change_module';
    this.bdOrigin = 'change_origin';
    this.bdRelatedModules = 'related_modules';
    this.bdDate = 'request_date';
    this.bdChangeAssessment = 'change_assessment';
    this.bdPeoples = 'people_involved';
    this.bdRisks = 'impact_risks';
    this.bdTrajectory = 'imp_trajectory';
    this.bdStatus = 'change_status';
    this.bdPriority = 'priority';
    this.bdRecommendations = 'recommendations';
    this.bdDeliveryForecast = 'delivery_forecast';
    this.bdSuccess = 'success';
    this.bdAfterImp = 'after_imp';
  }

  // INSERT SECTION ↓ ↓
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
  // INSERT SECTION ↑ ↑

  // SEARCH SECTION ↓ ↓
  async buscar() {
    try {
      await database
        .select(this.getSelectFields())
        .into(this.bdTabela)
        .where(this.getWhereClausesSearch())
        .whereRaw(this.getWhereRawClausesSearch())
        .orderBy(this.getOrderBy())
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
  // SEARCH SECTION ↑ ↑

  // UPDATE SECTION ↓ ↓
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
        .catch((err) => {
          utils.msgError(err);
          throw err;
        });
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    return this.resposta;
  }
  // UPDATE SECTION ↑ ↑

  // DELETE SECTION ↓ ↓
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
  // DELETE SECTION ↑ ↑
}