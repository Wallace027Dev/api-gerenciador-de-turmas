const express = require("express");
const controladorDeMateria = require("../controllers/controladorDeMateria");
const capturaErros = require("../utils/capturaErros");
const rotasDeMateria = express.Router();

rotasDeMateria.get(
  "/",
  capturaErros(controladorDeMateria.listarTodos)
);
rotasDeMateria.get(
  "/:id",
  capturaErros(controladorDeMateria.buscarUm)
);
rotasDeMateria.post(
  "/",
  capturaErros(controladorDeMateria.criar)
);
rotasDeMateria.put(
  "/:id",
  capturaErros(controladorDeMateria.atualizar)
);
rotasDeMateria.delete(
  "/:id",
  capturaErros(controladorDeMateria.remover)
);

module.exports = rotasDeMateria;
