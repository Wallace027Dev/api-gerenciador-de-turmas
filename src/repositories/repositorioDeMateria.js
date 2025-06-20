const { db } = require("../../prisma/main");

class RepositorioDeUsuario {
  async listarTodos() {
    return await db.materia.findMany();
  }

  async buscarPeloId(id) {
    return await db.materia.findUnique({ where: { id } });
  }

  async criar({ nome, professorId, horario, duracao, sala }) {
    return await db.materia.create({
      data: {
        nome,
        professorId,
        horario,
        duracao,
        sala,
      },
    });
  }

  async atualizar(id, dadosAtualizados) {
    return await db.materia.update({
      where: { id },
      data: dadosAtualizados,
    });
  }

  async remover(id) {
    return await db.materia.delete({ where: { id } });
  }
}

module.exports = new RepositorioDeUsuario();
