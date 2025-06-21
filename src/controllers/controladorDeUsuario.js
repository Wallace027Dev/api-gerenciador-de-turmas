const servicoDeUsuario = require("../services/servicoDeUsuario");
const validadorDeUsuario = require("../validators/validadorDeUsuario");

class ControladorDeUsuario {
  async listarTodos(_req, res) {
    const usuarios = await servicoDeUsuario.listarTodos();

    const usuariosSemSenha = usuarios.map(({ senha, ...usuario }) => usuario);

    res
      .status(200)
      .json({ mensagem: "Usuários encontrados", dados: usuariosSemSenha });
  }

  async pegarUmPeloID(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    const { senha, ...usuario } = await servicoDeUsuario.pegarPeloID(
      id
    );

    res.status(200).json({ mensagem: "Usuário encontrado", dados: usuario });
  }

  async cadastrar(req, res) {
    const validacao = validadorDeUsuario(req.body);
    if (validacao.error) throw new HttpError(400, validacao.error);

    const { senha, ...usuarioSemSenha } = await servicoDeUsuario.cadastrar(req.body, req.headers);

    res.status(201).json({mesagem: "Usuário cadastrado", dados: usuarioSemSenha});
  }

  async conectar(req, res) {
    const token = await servicoDeUsuario.conectar(req.body);

    res.status(200).json({ message: "Usuário conectado", token });
  }

  async atualizar(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    const { senha, ...usuarioAtualizado } = await servicoDeUsuario.atualizar(
      id,
      req.body
    );

    res.status(200).json({mensagem: "Usuário atualizado", dados: usuarioAtualizado});
  }

  async remover(req, res) {
    if (!req.params.id) throw new HttpError(400, "O ID não foi informado");

    const id = Number(req.params.id);
    await servicoDeUsuario.remover(id);

    res
      .status(200)
      .json({ mensagem: `Usuário com ID ${id} deletado com sucesso.` });
  }
}

module.exports = new ControladorDeUsuario();
