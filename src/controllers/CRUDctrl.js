const express = require("express");
const controller = express.Router();
let model;

const license = require("../functions/jwt");

function instanciaUser(r) {
  return new model(
    r.id,
    r.user,
    r.pass,
    r.mail,
    r.type,
    r.active
  );
}

function instanciaRequester(r) {
  return new model(
    r.id,
    r.name,
    r.mail,
    r.contact,
    r.company,
    r.comments
  );
}

function instanciaVersion(r) {
  return new model(
    r.id,
    r.version,
    r.date,
    r.module
  );
}

function instanciaChange(r) {
  return new model(
    r.id,
    r.title,
    r.description,
    r.requester,
    r.user_creator,
    r.benefits,
    r.not_imp_effec,
    r.change_type,
    r.change_module,
    r.change_origin,
    r.request_date,
    r.change_assessment,
    r.impact_risks,
    r.imp_trajectory,
    r.change_status,
    r.priority,
    r.recommendations,
    r.delivery_forecast,
    r.success,
    r.after_imp,
    r.persons,
    r.relatedModules,
  );
}

function instanciaModel(req) {
  if (req.baseUrl === '/user') {
    model = require('../models/mdlUser');
    return instanciaUser(req.body);
  } else if (req.baseUrl === '/requester') {
    model = require('../models/mdlRequester');
    return instanciaRequester(req.body);
  } else if (req.baseUrl === '/module') {
    model = require('../models/mdlModule');
    return new model(req.body.module, req.body.previous);
  } else if (req.baseUrl === '/version') {
    model = require('../models/mdlVersion');
    return instanciaVersion(req.body);
  } else if (req.baseUrl === '/change') {
    model = require('../models/mdlChange');
    return instanciaChange(req.body);
  }
}

controller.post('/inserir', async (req, res) => {
  try {
    res.status(200).json({ message: await instanciaModel(req).inserir() });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `** ERROR!!! **: ${error}` })
  }
})

controller.post('/buscar', async (req, res) => {
  try {
    res.status(200).json({
      message: 'Busca efetuada com sucesso!',
      data: await instanciaModel(req).buscar()
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `** ERROR!!! **: ${error}` })
  }
})

controller.put('/alterar', async (req, res) => {
  try {
    res.status(200).json({ message: await instanciaModel(req).alterar() });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `** ERROR!!! **: ${error}` })
  }
})

controller.delete('/deletar', async (req, res) => {
  try {
    res.status(200).json({ message: await instanciaModel(req).deletar() });
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: `** ERROR!!! **: ${error}` })
  }
})

module.exports = controller;

