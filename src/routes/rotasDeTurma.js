const express = require("express");
const controladorDeTurma = require("../controllers/controladorDeTurma");
const capturaErros = require("../utils/capturaErros");
const rotasDeTurma = express.Router();

rotasDeTurma.post(
  "/:turmaId/alunos",
  capturaErros(controladorDeTurma.cadastrarAlunos)
);
rotasDeTurma.get(
  "/:turmaId/alunos",
  capturaErros(controladorDeTurma.listarAlunos)
);
rotasDeTurma.delete(
  "/:turmaId/alunos/:alunoId",
  capturaErros(controladorDeTurma.removerAlunoDaTurma)
);

rotasDeTurma.post(
  "/",
  capturaErros(controladorDeTurma.criar)
);
rotasDeTurma.get(
  "/",
  capturaErros(controladorDeTurma.listarTodos)
);
rotasDeTurma.get(
  "/:id",
  capturaErros(controladorDeTurma.buscarUm)
);
rotasDeTurma.put(
  "/:id",
  capturaErros(controladorDeTurma.atualizar)
);
rotasDeTurma.delete(
  "/:id",
  capturaErros(controladorDeTurma.remover)
);

module.exports = rotasDeTurma;
