const { HttpError } = require("../errors/HttpError");
const { Usuario } = require("../models/Usuario");
const repositorioDeUsuario = require("../repositories/repositorioDeUsuario");

class ServicoDeAutorizacao {
  async cadastrarProfessor(dados) {
    return this.cadastrar({ ...dados, role: "professor" });
  }

  async cadastrar({ nome, email, cpf, senha, role = "aluno" }) {
    await this._verificarDuplicidade(email, cpf);

    if (role === "admin") {
      throw new HttpError(403, "Não é permitido criar admin via API.");
    }

    const senhaHash = await Usuario.criptografar(senha);

    return await repositorioDeUsuario.criar({
      nome,
      email,
      cpf,
      senha: senhaHash,
      role,
    });
  }

  async cadastrarProfessor(dados) {
    return this.cadastrar({ ...dados, role: "professor" });
  }

  async conectar({ email, senha }) {
    const usuario = await repositorioDeUsuario.buscarPeloEmail(email);
    if (!usuario) throw new HttpError(404, "Usuário não encontrado.");

    const senhaCorreta = await Usuario.compararSenha(senha, usuario.senha);
    if (!senhaCorreta) throw new HttpError(401, "Senha incorreta.");

    const token = Usuario.gerarToken(usuario);
    await repositorioDeUsuario.atualizarPeloId(usuario.id, { token });

    return token;
  }

  async _verificarDuplicidade(email, cpf) {
    const emailJaExiste = await repositorioDeUsuario.buscarPeloEmail(email);
    if (emailJaExiste) throw new HttpError(409, "Email já cadastrado.");

    const cpfJaExiste = await repositorioDeUsuario.buscarPeloCpf(cpf);
    if (cpfJaExiste) throw new HttpError(409, "CPF já cadastrado.");
  }

  async _verificarDuplicidade(email, cpf) {
    const emailJaExiste = await repositorioDeUsuario.buscarPeloEmail(email);
    if (emailJaExiste) throw new HttpError(409, "Email já cadastrado.");

    const cpfJaExiste = await repositorioDeUsuario.buscarPeloCpf(cpf);
    if (cpfJaExiste) throw new HttpError(409, "CPF já cadastrado.");
  }
}

module.exports = new ServicoDeAutorizacao();
