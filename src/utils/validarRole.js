const { HttpError } = require("../errors/HttpError");
class ValidarRole {
  cadastro(role) {
    const rolesPermitidas = ["professor", "aluno", undefined];
    if (!rolesPermitidas.includes(role)) {
      throw new HttpError(
        400,
        "Role inválida. Deve ser 'professor' ou 'aluno'."
      );
    }
  }

  update(role) {
    const rolesPermitidas = ["professor", "aluno"];
    if (!rolesPermitidas.includes(role)) {
      throw new HttpError(
        400,
        "Role inválida. Deve ser 'professor' ou 'aluno'."
      );
    }
    if (role === "admin") {
      throw new HttpError(403, "Não é permitido alterar a role para admin.");
    }
  }
}
module.exports = new ValidarRole();
