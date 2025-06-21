const express = require("express");
const controladorDeAutorizacao = require("../controllers/controladorDeAutorizacao");
const capturaErros = require("../utils/capturaErros");
const verificarAdmin = require("../middleware/verificarAdmin");
const rotasDeAutorizacao = express.Router();

rotasDeAutorizacao.post(
  "/cadastrar",
  capturaErros(controladorDeAutorizacao.cadastrar)
);
rotasDeAutorizacao.post(
  "/cadastrar/professor",
  verificarAdmin,
  capturaErros(controladorDeAutorizacao.cadastrarProfessor)
);
rotasDeAutorizacao.post(
  "/conectar",
  capturaErros(controladorDeAutorizacao.conectar)
);

module.exports = rotasDeAutorizacao;
