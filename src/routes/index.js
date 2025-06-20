const express = require("express");
const router = express.Router();

const rotasDeUsuario = require("../routes/rotasDeUsuario");
const rotasDeMateria = require("./rotasDeMateria");

router.get("/", (_req, res) => res.status(200).send("Olá mundo"));

router.use("/usuarios", rotasDeUsuario);
router.use("/materias", rotasDeMateria);

module.exports = router;