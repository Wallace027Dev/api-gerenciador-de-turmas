const express = require("express");
const controladorDeTurma = require("../controllers/controladorDeTurma");
const capturaErros = require("../utils/capturaErros");
const rotasDeTurma = express.Router();

rotasDeTurma.post(
  "/turmas",
  capturaErros(controladorDeTurma.cadastrar)
);
rotasDeTurma.get(
  "/turmas",
  capturaErros(controladorDeTurma.listarTurmas)
);
rotasDeTurma.put(
  "/turmas/:id",
  capturaErros(controladorDeTurma.atualizarTurma)
);
rotasDeTurma.delete(
  "turmas/:id",
  capturaErros(controladorDeTurma.removerTurma)
);

rotasDeTurma.post(
  "/turmas/:id/alunos",
  capturaErros(controladorDeTurma.adicionarAlunoNaTurma)
);
rotasDeTurma.get(
  "/turmas/:id/alunos",
  capturaErros(controladorDeTurma.listarAlunosDaTurma)
);
rotasDeTurma.delete(
  "/turmas/:id/alunos/:id",
  capturaErros(controladorDeTurma.removerAlunoDaTurma)
);

module.exports = rotasDeTurma;
