const { db } = require("../../prisma/main");

class RepositorioDeTurma {
  async listarTodos() {
    return await db.turma.findMany();
  }

  async buscarPeloId(id) {
    return await db.turma.findUnique({
      where: { id },
      include: {
        professor: true,
        materia: true,
      },
    });
  }

  async criar({ professorId, materiaId, horario, duracao, sala }) {
    return await db.turma.create({
      data: {
        professorId,
        materiaId,
        horario,
        duracao,
        sala,
        alunos: {},
      },
    });
  }

  async atualizarPeloId(id, dadosAtualizados) {
    return await db.turma.update({
      where: { id },
      data: dadosAtualizados,
    });
  }

  async removerPeloId(id) {
    return await db.turma.delete({ where: { id } });
  }

  async listarAlunosPeloIdDaTurma(id) {
    const objAlunosNaTurma = await db.alunoNaTurma.findMany({
      where: { turmaId: id },
      include: {
        usuario: true,
      },
    });

    return objAlunosNaTurma.map((obj) => obj.usuario);
  }

  async cadastrarAlunosPelosIds(data) {
    return await db.alunoNaTurma.createMany({
      data,
      skipDuplicates: true,
    });
  }

  async removerAlunoDaTurmaPeloId(turmaId, alunoId) {
    return await db.alunoNaTurma.deleteMany({
      where: {
        turmaId,
        usuarioId: alunoId,
      },
    });
  }
}

module.exports = new RepositorioDeTurma();
