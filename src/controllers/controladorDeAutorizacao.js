const servicoDeAutorizacao = require("../services/servicoDeAutorizacao");
const { HttpError } = require("../errors/HttpError");
const validadorDeUsuario = require("../validators/validadorDeUsuario");

class ControladorDeUsuario {
  async cadastrar(req, res) {
    const validacao = validadorDeUsuario(req.body);
    if (validacao.error) throw new HttpError(400, validacao.error);

    const usuario = await servicoDeAutorizacao.cadastrar(req.body);

    const { senha, ...usuarioSemSenha } = usuario;
    res
      .status(201)
      .json({ mensagem: "Usuário cadastrado", dados: usuarioSemSenha });
  }

  async cadastrarProfessor(req, res) {
    const validacao = validadorDeUsuario(req.body);
    if (validacao.error) throw new HttpError(400, validacao.error);

    const usuario = await servicoDeAutorizacao.cadastrarProfessor(req.body);

    const { senha, ...usuarioSemSenha } = usuario;
    res
      .status(201)
      .json({ mensagem: "Professor cadastrado", dados: usuarioSemSenha });
  }

  async conectar(req, res) {
    const token = await servicoDeAutorizacao.conectar(req.body);

    res.status(200).json({ message: "Usuário conectado", token });
  }
}

module.exports = new ControladorDeUsuario();
