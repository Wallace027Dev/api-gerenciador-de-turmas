const express = require("express");
const controladorDeMateria = require("../controllers/controladorDeMateria");
const capturaErros = require("../utils/capturaErros");
const rotasDeMateria = express.Router();

rotasDeMateria.get(
  "/materias",
  capturaErros(controladorDeMateria.listarTodos)
);
rotasDeMateria.get(
  "/materias/:id",
  capturaErros(controladorDeMateria.buscarUm)
);
rotasDeMateria.post(
  "/materias",
  capturaErros(controladorDeMateria.criar)
);
rotasDeMateria.put(
  "/materias/:id",
  capturaErros(controladorDeMateria.atualizar)
);
rotasDeMateria.delete(
  "/materias/:id",
  capturaErros(controladorDeMateria.remover)
);

module.exports = rotasDeMateria;
