const RepositorioDeUsuario = require("../repositories/repositorioDeUsuario");
const { HttpError } = require("../errors/HttpError");

async function validarDuplicidadeUsuario(email, cpf) {
  const emailExiste = await RepositorioDeUsuario.buscarPeloEmail(email);
  if (emailExiste) throw new HttpError(409, "Email já cadastrado.");

  const cpfExiste = await RepositorioDeUsuario.buscarPeloCpf(cpf);
  if (cpfExiste) throw new HttpError(409, "CPF já cadastrado.");
}

module.exports = validarDuplicidadeUsuario;
