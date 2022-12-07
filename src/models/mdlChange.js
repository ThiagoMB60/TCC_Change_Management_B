const daoEntidade = require("../database/daoChange");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const utils = require("../functions/utils")
require("dotenv").config();

module.exports = class Change extends CRUDModel {
  constructor(
    id,
    title,
    description,
    requester,
    user,
    benefits,
    notImpEffects,
    type,
    module,
    origin,
    date,
    changeAssessment,
    risks,
    trajectory,
    status,
    priority,
    recommendations,
    deliveryForecast,
    success,
    afterImp,
    peoples,
    relatedModules,
    // perPage,    //pagination-params
    // numReg      //pagination-params
  ) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;             //STRING UUID FORMAT
    this.title = title;         //STRING
    this.description = description;             //STRING
    this.requester = requester;             //STRING UUID FORMAT
    this.user = user; //STRING UUID FORMAT
    this.benefits = benefits;             //STRING
    this.notImpEffects = notImpEffects; //STRING
    this.type = type;             //STRING
    this.module = module;             //STRING fk
    this.origin = origin;             //STRING
    this.relatedModules = relatedModules;             //STRING fk
    this.date = date; //date
    this.changeAssessment = changeAssessment;             //STRING
    this.peoples = peoples;             //STRING UUID FORMAT
    this.risks = risks;             //STRING
    this.trajectory = trajectory;             //STRING
    this.status = status; //STRING
    this.priority = priority;             //STRING
    this.recommendations = recommendations;             //STRING
    this.deliveryForecast = deliveryForecast;             //date
    this.success = success;             //boolean
    this.afterImp = afterImp;             //STRING
    // this.perPage = perPage;             //number
    // this.numReg = numReg;             //number
  }

  validaEntrada() {
    if (!this.title) throw 'Título da alteração vazio ou Inválido.'
    if (!this.description) throw 'descrição da alteração vazia ou inválida.'
    if (!this.requester) throw 'Solicitante não informado.'
    if (!this.success) this.success = null;
    if (!this.deliveryForecast) this.deliveryForecast = null;
  }

  validaInserir() {
    try {
      this.validaEntrada();
      this.status = 'PENDENTE';
      this.id = uuidv4();
    } catch (error) {
      utils.msgError(error);
      throw error;
    }
    //console.log(this)
  }
}