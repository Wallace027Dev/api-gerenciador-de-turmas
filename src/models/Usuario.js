const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class Usuario {
  static async criptografar(senha) {
    return await bcrypt.hash(senha, Number(process.env.SALT_ROUNDS));
  }

  static async compararSenha(senha, hash) {
    return await bcrypt.compare(senha, hash);
  }

  static gerarToken(usuario) {
    return jwt.sign(
      {
        id: usuario.id,
        role: usuario.role || "student",
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );
  }
}

module.exports = { Usuario };
