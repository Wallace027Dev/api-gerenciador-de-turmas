const { db } = require("../../prisma/main");

class RepositorioDeUsuario {
  async listarTodos() {
    return await db.usuario.findMany();
  }

  async buscarPeloEmail(email) {
    return await db.usuario.findUnique({ where: { email } });
  }

  async buscarPeloId(id) {
    return await db.usuario.findUnique({ where: { id } });
  }

  async buscarPeloCpf(cpf) {
    return await db.usuario.findUnique({ where: { cpf } });
  }

  async criar({ nome, email, cpf, senha, role }) {
    return await db.usuario.create({
      data: {
        nome,
        email,
        cpf,
        senha,
        role,
      },
    });
  }

  async atualizarPeloId(id, dadosAtualizados) {
    return await db.usuario.update({
      where: { id },
      data: dadosAtualizados,
    });
  }

  async removerUsuarioPeloId(id) {
    return await db.usuario.delete({ where: { id } });
  }
}

module.exports = new RepositorioDeUsuario();
