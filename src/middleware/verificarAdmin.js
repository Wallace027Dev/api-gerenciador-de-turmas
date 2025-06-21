const jwt = require("jsonwebtoken");
const { HttpError } = require("../errors/HttpError");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");

async function verificarAdmin(req, _res, next) {
  const authorization = req.headers["authorization"];
  if (!authorization) {
    return next(new HttpError(401, "Token não enviado."));
  }

  const token = authorization.replace("Bearer ", "").trim();

  let payload;
  try {
    payload = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return next(new HttpError(401, "Token inválido."));
  }

  if (payload.role !== "admin") {
    return next(new HttpError(403, "Somente admin pode fazer isso."));
  }

  const admin = await RepositorioDeUsuario.buscarPeloId(1);
  if (!admin || admin.token.trim() !== token) {
    return next(new HttpError(403, "Token inválido para o admin."));
  }

  next();
}

module.exports = verificarAdmin;
