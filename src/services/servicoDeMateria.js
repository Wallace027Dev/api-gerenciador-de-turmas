const RepositorioDeMateria = require("../repositories/repositorioDeMateria");
const { HttpError } = require("../errors/HttpError");
const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");

class ServicoDeMateria {
  async listarTodos() {
    return await RepositorioDeMateria.listarTodos();
  }

  async buscarUm(id) {
    const materia = await RepositorioDeMateria.buscarPeloId(id);
    if (!materia) throw new HttpError(404, "Matéria não encontrada!");

    return materia;
  }

  async criar({ nome, professorId }) {
    const usuarioExiste = await RepositorioDeUsuario.buscarPeloId(professorId);

    if (!usuarioExiste) throw new HttpError(404, "Matéria não encontrado!");

    if (usuarioExiste.role !== "professor") {
      throw new HttpError(403, "Apenas professores podem criar matérias!");
    }
    
    const dadosFormatados = {
      nome,
      professorId,
    };

    return await RepositorioDeMateria.criar(dadosFormatados);
  }

  async atualizar(materiaId, dadosNovos) {
    const materiaExistente = await RepositorioDeMateria.buscarPeloId(materiaId);
    if (!materiaExistente) throw new HttpError(404, "Matéria não encontrada!");

    const { nome, professorId } = dadosNovos;

    const dadosAtualizados = {
      nome: nome ?? materiaExistente.nome,
      professorId: professorId ?? materiaExistente.professorId,
    };

    return await RepositorioDeMateria.atualizarPeloId(
      materiaId,
      dadosAtualizados
    );
  }

  async remover(id) {
    const materiaExistente = await RepositorioDeMateria.buscarPeloId(id);
    if (!materiaExistente) throw new HttpError(404, "Matéria não encontrada!");

    return await RepositorioDeMateria.removerPeloId(id);
  }
}

module.exports = new ServicoDeMateria();
