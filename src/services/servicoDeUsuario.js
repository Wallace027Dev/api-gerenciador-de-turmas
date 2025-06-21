const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { Usuario } = require("../models/Usuario");
const { HttpError } = require("../errors/HttpError");

class ServicoDeUsuario {
  async listarTodos() {
    return await RepositorioDeUsuario.listarTodos();
  }

  async pegarPeloID(id) {
    const usuario = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuario) throw new HttpError(404, "Usuário não encontrado!");

    return usuario;
  }

  async cadastrar({ nome, email, cpf, senha, role }, headers) {
    await this._verificarDuplicidade(email, cpf);

    const rolesPermitidas = ["professor", "aluno"];
    if (role && !rolesPermitidas.includes(role)) {
      throw new HttpError(
        400,
        "Role inválida. Deve ser 'professor' ou 'aluno'."
      );
    }

    if (role === "professor") {
      await this._verificarAutenticacaoAdmin(headers);
    }

    const senhaHash = await Usuario.criptografar(senha);

    return await RepositorioDeUsuario.criar({
      nome,
      email,
      cpf,
      senha: senhaHash,
      role: role ?? "aluno",
    });
  }

  async conectar({ email, senha }) {
    const usuarioEncontrado = await RepositorioDeUsuario.buscarPeloEmail(email);
    if (!usuarioEncontrado) throw new HttpError(404, "Usuário não encontrado.");

    const senhaCorreta = await Usuario.compararSenha(
      senha,
      usuarioEncontrado.senha
    );

    if (!senhaCorreta) throw new HttpError(401, "Senha incorreta.");

    const token = Usuario.gerarToken(usuarioEncontrado);
    await RepositorioDeUsuario.atualizarPeloId(usuarioEncontrado.id, { token });

    return token;
  }

  async atualizar(usuarioId, dadosNovos) {
    const usuarioExistente = await RepositorioDeUsuario.buscarPeloId(usuarioId);
    if (!usuarioExistente) throw new HttpError(404, "Usuário não encontrado!");

    const { nome, email, cpf, senha, role } = dadosNovos;

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
    const usuarioExistente = await RepositorioDeUsuario.buscarPeloId(id);
    if (!usuarioExistente) {
      throw new HttpError(404, "Usuário nao encontrado!");
    }

    return await RepositorioDeUsuario.removerUsuarioPeloId(id);
  }

  async _verificarDuplicidade(email, cpf) {
    const emailJaExiste = await RepositorioDeUsuario.buscarPeloEmail(email);
    if (emailJaExiste) {
      throw new HttpError(409, "Email já cadastrado.");
    }

    const cpfJaExiste = await RepositorioDeUsuario.buscarPeloCpf(cpf);
    if (cpfJaExiste) {
      throw new HttpError(409, "CPF já cadastrado.");
    }
  }

  async _verificarAutenticacaoAdmin(headers) {
    const authorization = headers["authorization"];
    if (!authorization) {
      throw new HttpError(401, "Token não enviado.");
    }

    const token = authorization.replace("Bearer ", "").trim();

    let payload;
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      throw new HttpError(401, "Token inválido.");
    }

    if (payload.role !== "admin") {
      throw new HttpError(403, "Somente admin pode criar professores.");
    }

    const admin = await RepositorioDeUsuario.buscarPeloId(1);
    if (!admin || admin.token.trim() !== token) {
      throw new HttpError(403, "Token inválido para o admin.");
    }
  }
}

module.exports = new ServicoDeUsuario();
