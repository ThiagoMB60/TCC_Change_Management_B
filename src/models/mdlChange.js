const daoEntidade = require("../database/daoChange");
const CRUDModel = require("./mdlCRUD");
const { v4: uuidv4 } = require('uuid');
const utils = require("../functions/utils")
require("dotenv").config();

module.exports = class Change extends CRUDModel {
  constructor(
    id,
    title,
    requester,
    benefits,
    notImpEffects,
    type,
    module,
    origin,
    relatedModules,
    date,
    changeAssessment,
    peoples,
    risks,
    trajectory,
    status,
    priority,
    recommendations,
    deliveryForecast,
    success,
    afterImp,
    perPage,    //pagination-params
    numReg      //pagination-params
  ) {
    super(daoEntidade); //resposta, dao <-- atributos herdados
    this.id = id;             //STRING UUID FORMAT
    this.title = title;         //STRING
    this.requester = requester;             //STRING UUID FORMAT
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
    this.perPage = perPage;             //number
    this.numReg = numReg;             //number
  }


}