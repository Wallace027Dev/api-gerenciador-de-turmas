const { HttpError } = require("../errors/HttpError");
const servicoDeMateria = require("../services/servicoDeMateria");
const validadorDeMateria = require("../validators/validadorDeMateria");

class ControladorDeMateria {
  async listarTodos(_req, res) {
    const materias = await servicoDeMateria.listarTodos();

    res.status(200).json({ mensagem: "Materias encontradas", dados: materias });
  }

  async buscarUm(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    const { professorId, ...materia } = await servicoDeMateria.buscarUm(id);

    res.status(200).json({ mesagem: "Matéria encontrada", dados: materia });
  }

  async criar(req, res) {
    const validacao = validadorDeMateria(req.body);
    if (validacao.error) throw new HttpError(400, validacao.error);

    const novaMateria = await servicoDeMateria.criar(req.body);

    res.status(201).json({ mensagem: "Matéria criada", dados: novaMateria });
  }

  async atualizar(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    const materiaAtualizada = await servicoDeMateria.atualizar(id, req.body);

    res
      .status(200)
      .json({ mensagem: "Matéria atualizada", dados: materiaAtualizada });
  }

  async remover(req, res) {
    const id = req.params.id;
    await servicoDeMateria.remover(id);

    res
      .status(200)
      .json({ mensagem: `Matéria com ID ${id} deletada com sucesso.` });
  }
}

module.exports = new ControladorDeMateria();
