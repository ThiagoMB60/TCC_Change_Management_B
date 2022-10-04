const express = require("express");
const controller = express.Router();
let model;

function instanciaEmpresa(r) {
  return new model(
    r.id,
    r.cnpj,
    r.razao,
    r.ativo
  );
}

function instanciaModel(req) {
  if (req.baseUrl === '/empresa') {
    model = require('../models/mdlEmpresa');
    return instanciaEmpresa(req.body);
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
      results: await instanciaModel(req).buscar()
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

