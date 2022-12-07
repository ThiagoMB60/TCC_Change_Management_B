const database = require("./database");
const utils = require("../functions/utils")

module.exports = class DaoChange {
  constructor(objeto) {
    this.obj = objeto;
    this.resposta;  //resposta para o model

    this.bdTabela = 'change';
    this.bdId = 'id';
    this.bdTitle = 'title';
    this.bdDescriptions = 'description'
    this.bdRequester = 'requester';
    this.bdUser = 'user_creator';
    this.bdBenefits = 'benefits';
    this.bdNotImpEffects = 'not_imp_effec';
    this.bdType = 'change_type';
    this.bdModule = 'change_module';
    this.bdOrigin = 'change_origin';
    // this.bdRelatedModules = 'related_modules';
    this.bdDate = 'request_date';
    this.bdChangeAssessment = 'change_assessment';
    // this.bdPeoples = 'people_involved';
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
  getParamsInsert() {
    return {
      [this.bdId]: this.obj.id,
      [this.bdTitle]: this.obj.title,
      [this.bdDescriptions]: this.obj.description,
      [this.bdRequester]: this.obj.requester,
      [this.bdUser]: this.obj.user,
      [this.bdBenefits]: this.obj.benefits,
      [this.bdNotImpEffects]: this.obj.notImpEffects,
      [this.bdType]: this.obj.type,
      [this.bdModule]: this.obj.module,
      [this.bdOrigin]: this.obj.origin,
      // [this.bdRelatedModules]: this.obj.relatedModules,
      [this.bdDate]: this.obj.date,
      [this.bdChangeAssessment]: this.obj.changeAssessment,
      // [this.bdPeoples]: this.obj.peoples,
      [this.bdRisks]: this.obj.risks,
      [this.bdTrajectory]: this.obj.trajectory,
      [this.bdStatus]: this.obj.status,
      [this.bdPriority]: this.obj.priority,
      [this.bdRecommendations]: this.obj.recommendations,
      [this.bdDeliveryForecast]: this.obj.deliveryForecast,
      [this.bdSuccess]: this.obj.success,
      [this.bdAfterImp]: this.obj.afterImp
    }
  }

  getSelectFields() {
    return '*'
  }

  getWhereClausesSearch() {

    utils.msgWarning(this.obj.status)
    let obj = {}
    if (this.obj.status) obj[this.bdStatus] = this.obj.status;
    return obj;
  }

  getWhereRawClausesSearch() {
    return "";
  }

  getOrderBy() {
    return 'priority';
  }

  async inserir() {
    try {
      await database
        .insert(this.getParamsInsert())
        .into(this.bdTabela)
        .then(() => this.resposta = `'${this.obj.constructor.name}' cadastrada com SUCESSO`)
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
        .join('requesters', 'change.requester', '=', 'requesters.id')
        .select(this.getSelectFields())
        .into(this.bdTabela)
        .where(this.getWhereClausesSearch())
        .whereRaw(this.getWhereRawClausesSearch())
        .orderBy(this.getOrderBy()).debug()
        .then((result) => this.resposta = result)

        .catch((err) => {
          utils.msgError(err);
          throw err;
        });
    } catch (error) {
      utils.msgError(error)
      throw error;
    }
    console.log(this.resposta);
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