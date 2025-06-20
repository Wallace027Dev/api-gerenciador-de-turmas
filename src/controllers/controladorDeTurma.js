const { HttpError } = require("../errors/HttpError");
const servicoDeTurma = require("../services/servicoDeTurma");
const validadorDeTurma = require("../validators/validadorDeTurma");

class ControladorDeTurma {
  async listarTodos(_req, res) {
    const turmas = await servicoDeTurma.listarTodos();

    res.status(200).json({ mensagem: "Turmas encontradas", dados: turmas });
  }

  async buscarUm(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    const {professorId, materiaId, ...turma} = await servicoDeTurma.buscarUm(id);

    res.status(200).json({ mesagem: "Turma encontrada", dados: turma });
  }

  async criar(req, res) {
    const validacao = validadorDeTurma(req.body);
    if (validacao.error) throw new HttpError(400, validacao.error);

    const novaTurma = await servicoDeTurma.criar(req.body);

    res.status(201).json({ mensagem: "Turma criada", dados: novaTurma });
  }

  async atualizar(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");
    const id = Number(req.params.id);

    const turmaAtualizada = await servicoDeTurma.atualizar(id, req.body);

    res
      .status(200)
      .json({ mensagem: "Turma atualizada", dados: turmaAtualizada });
  }

  async remover(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");
    const id = Number(req.params.id);

    await servicoDeTurma.remover(id);

    res
      .status(200)
      .json({ mensagem: `Turma com ID ${id} deletada com sucesso.` });
  }

  async listarAlunos(req, res) {
    if (!req.params.turmaId) throw new HttpError(400, "O ID não foi informado");

    const turmaId = Number(req.params.turmaId);
    const alunos = await servicoDeTurma.listarAlunos(turmaId);

    res.status(200).json({ mensagem: "Alunos desta turma encontrados", dados: alunos });
  }

  async cadastrarAlunos(req, res) {
    if (!req.params.turmaId) throw new HttpError(400, "O ID não foi informado");

    const turmaId = Number(req.params.turmaId);
    const alunos = await servicoDeTurma.cadastrarAlunos(turmaId, req.body.alunosIds);

    res
      .status(201)
      .json({ mensagem: "Alunos cadastrado na turma com sucesso.", dados: alunos });    
  }

  async removerAlunoDaTurma(req, res) {
    if (!req.params.turmaId) throw new HttpError(400, "O ID não foi informado");

    const turmaId = Number(req.params.turmaId);
    const alunoId = Number(req.params.alunoId);
    await servicoDeTurma.removerAlunoDaTurma(turmaId, alunoId);

    res
      .status(200)
      .json({ mensagem: "Aluno removido da turma com sucesso." });    
  }
}

module.exports = new ControladorDeTurma();
