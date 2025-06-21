const express = require("express");
const router = express.Router();

const rotasDeAutorizacao = require("./rotasDeAutorizacao");
const rotasDeUsuario = require("../routes/rotasDeUsuario");
const rotasDeMateria = require("./rotasDeMateria");
const rotasDeTurma = require("./rotasDeTurma");

router.get("/", (_req, res) => res.status(200).send("Olá mundo"));

router.use("/auth", rotasDeAutorizacao);
router.use("/usuarios", rotasDeUsuario);
router.use("/materias", rotasDeMateria);
router.use("/turmas", rotasDeTurma);

module.exports = router;
