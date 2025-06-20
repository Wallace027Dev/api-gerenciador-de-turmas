const RepositorioDeTurma = require("../repositories/repositorioDeTurma");
const { HttpError } = require("../errors/HttpError");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");

class ServicoDeTurma {
  async listarTodos() {
    return await RepositorioDeTurma.listarTodos();
  }

  async buscarUm(id) {
    const turma = await RepositorioDeTurma.buscarPeloId(id);
    if (!turma) throw new HttpError(404, "Turma não encontrada!");

    return turma;
  }

  async criar(dados) {
    const usuarioExiste = await RepositorioDeUsuario.buscarPeloId(
      dados.professorId
    );

    if (!usuarioExiste) throw new HttpError(404, "Turma não encontrado!");

    if (usuarioExiste.role !== "professor") {
      throw new HttpError(403, "Apenas professores podem criar Turmas!");
    }

    return await RepositorioDeTurma.criar(dados);
  }

  async atualizar(turmaId, dadosNovos) {
    const turmaExistente = await RepositorioDeTurma.buscarPeloId(turmaId);
    if (!turmaExistente) throw new HttpError(404, "Turma não encontrada!");

    const { nome, professorId } = dadosNovos;

    const dadosAtualizados = {
      nome: nome ?? turmaExistente.nome,
      professorId: professorId ?? turmaExistente.professorId,
    };

    return await RepositorioDeTurma.atualizarPeloId(turmaId, dadosAtualizados);
  }

  async remover(id) {
    const turmaExistente = await RepositorioDeTurma.buscarPeloId(id);
    if (!turmaExistente) throw new HttpError(404, "Turma não encontrada!");

    return await RepositorioDeTurma.removerPeloId(id);
  }

  async listarAlunos(id) {
    return await RepositorioDeTurma.listarAlunosPeloIdDaTurma(id);
  }

  async cadastrarAlunos(turmaId, alunosIds) {
    const resultados = await Promise.all(
      alunosIds.map(async (alunoId) => {
        const alunoExiste = await RepositorioDeUsuario.buscarPeloId(alunoId);
        return !!alunoExiste;
      })
    );

    const todosExistem = resultados.every((existe) => existe);
    if (!todosExistem) {
      throw new HttpError(404, "Aluno(s) não encontrado(s)!");
    }

    const data = alunosIds.map((alunoId) => ({
      turmaId,
      usuarioId: alunoId,
    }));

    return await RepositorioDeTurma.cadastrarAlunosPelosIds(data);
  }

  async removerAlunoDaTurma(turmaId, alunoId) {
    return await RepositorioDeTurma.removerAlunoDaTurmaPeloId(turmaId, alunoId);
  }
}

module.exports = new ServicoDeTurma();
