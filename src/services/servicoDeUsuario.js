const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/HttpError");
const validarRole = require("../utils/validarRole");

class ServicoDeUsuario {
  async listarTodos() {
    return await RepositorioDeUsuario.listarTodos();
  }

  async pegarPeloID(id) {
    const usuario = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuario) throw new HttpError(404, "Usuário não encontrado!");
    return usuario;
  }

  async atualizar(usuarioId, dadosNovos, headers) {
    const usuarioExistente = await RepositorioDeUsuario.buscarPeloId(usuarioId);
    if (!usuarioExistente) throw new HttpError(404, "Usuário não encontrado!");

    const { nome, email, cpf, senha, role } = dadosNovos;

    if (role) {
      validarRole.update(role);
      if (role === "professor") {
        await validarAdmin(headers);
      }
    }

    const dadosAtualizados = {
      nome: nome ?? usuarioExistente.nome,
      email: email ?? usuarioExistente.email,
      cpf: cpf ?? usuarioExistente.cpf,
      role: role ?? usuarioExistente.role,
    };

    if (senha) {
      dadosAtualizados.senha = await Usuario.criptografar(senha);
    }

    return await RepositorioDeUsuario.atualizarPeloId(
      usuarioId,
      dadosAtualizados
    );
  }

  async remover(id) {
    const usuario = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuario) throw new HttpError(404, "Usuário não encontrado!");
    return await RepositorioDeUsuario.removerUsuarioPeloId(id);
  }
}

module.exports = new ServicoDeUsuario();
