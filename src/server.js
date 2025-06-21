require("dotenv").config();
const express = require("express");
const cors = require("cors");
const tratadorDeErros = require("./middleware/tratadorDeErros");
const rotas = require("./routes");
const server = express();

server.use(cors());
server.use(express.json());
server.use(rotas);
server.use((_req, res, _next) =>
  res.status(404).json({ erro: "Rota não existe" })
);
server.use(tratadorDeErros);

server.listen(process.env.PORT, () => console.log("Servidor está rodando!"));
