const servicoDeMateria = require("../services/servicoDeMateria");

class ControladorDeMateria {
  async listarTodos(_req, res) {
    const materias = await servicoDeMateria.listar();

    res.status(200).json(materias);
  }

  async buscarUm(req, res) {
    const id = req.params.id;
    const materia = await servicoDeMateria.buscar(id);

    res.status(200).json(materia);
  }

  async criar(req, res) {
    const { nome, professorId, horario, duracao, sala } = req.body;
    const resposta = await servicoDeMateria.criar(
      nome,
      professorId,
      horario,
      duracao,
      sala
    );

    if (resposta.error) res.status(400).json(resposta.error);

    res.status(201).json(resposta);
  }

  async atualizar(req, res) {
    const dados = req.body;
    const materiaId = req.params.id;
    const resposta = await servicoDeMateria.atualizar(materiaId, dados);

    res.status(200).json(resposta);
  }

  async remover(req, res) {
    const id = req.params.id;
    await servicoDeMateria.remover(id);

    res
      .status(204)
      .json({ mensagem: `Matéria com ID ${id} deletada com sucesso.` });
  }
}

module.exports = new ControladorDeMateria();
