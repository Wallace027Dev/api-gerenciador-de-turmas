const { db } = require("../../prisma/main");

class RepositorioDeUsuario {
  async listarTodos() {
    return await db.materia.findMany();
  }

  async buscarPeloId(id) {
    return await db.materia.findUnique({
      where: { id },
      include: { professor: true, turmas: true },
    });
  }

  async criar({ nome, professorId }) {
    return await db.materia.create({
      data: {
        nome,
        professorId,
      },
    });
  }

  async atualizarPeloId(id, dadosAtualizados) {
    return await db.materia.update({
      where: { id },
      data: dadosAtualizados,
    });
  }

  async removerPeloId(id) {
    return await db.materia.delete({ where: { id } });
  }
}

module.exports = new RepositorioDeUsuario();
