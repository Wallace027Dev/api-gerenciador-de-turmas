const { PrismaClient } = require("@prisma/client");
const { Usuario } = require("../models/Usuario");

const prisma = new PrismaClient();

class RepositorioDeUsuario {
  async buscarTodos() {
    return await prisma.usuario.findMany();
  }

  async criar({ nome, email, cpf, senha }) {
    return await prisma.usuario.create({
      data: {
        nome,
        email,
        cpf,
        senha,
        role: "aluno"
      }
    });
  }

  async buscarPeloEmail(email) {
    return await prisma.usuario.findUnique({ where: { email } });
  }

  async buscarPeloId(id) {
    return await prisma.usuario.findUnique({ where: { id } });
  }

  async atualizar(id, dadosAtualizados) {
    return await prisma.usuario.update({
      where: { id },
      data: dadosAtualizados
    });
  }

  async deletarUmUsuario(id) {
    return await prisma.usuario.delete({ where: { id } });
  }
}

module.exports = new RepositorioDeUsuario();
