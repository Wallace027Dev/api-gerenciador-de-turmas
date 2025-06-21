const jwt = require("jsonwebtoken");
const { HttpError } = require("../errors/HttpError");

function verificarToken(authorization) {
  if (!authorization) throw new HttpError(401, "Token não enviado.");

  const token = authorization.replace("Bearer ", "").trim();

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    return { token, payload };
  } catch (err) {
    throw new HttpError(401, "Token inválido.");
  }
}

module.exports = verificarToken;
