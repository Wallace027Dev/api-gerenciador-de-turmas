const express = require("express");
const controladorDeUsuario = require("../controllers/controladorDeUsuario");
const capturaErros = require("../utils/capturaErros");
const verificarAdmin = require("../middleware/verificarAdmin");
const rotasDeUsuario = express.Router();

rotasDeUsuario.get("/", capturaErros(controladorDeUsuario.listarTodos));
rotasDeUsuario.get("/:id", capturaErros(controladorDeUsuario.pegarUmPeloID));
rotasDeUsuario.put("/:id", capturaErros(controladorDeUsuario.atualizar));
rotasDeUsuario.delete("/:id", capturaErros(controladorDeUsuario.remover));

module.exports = rotasDeUsuario;
