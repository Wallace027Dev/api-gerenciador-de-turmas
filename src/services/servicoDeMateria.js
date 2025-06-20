const z = require("zod");
const RepositorioDeMateria = require("../repositories/repositorioDeMateria");
const { HttpError } = require("../errors/HttpError");

class ServicoDeMateria {
  async listarTodos() {
    return await RepositorioDeMateria.listarTodos();
  }

  async buscarUm(id) {
    if (!id) {
      throw new HttpError(400, "O ID não foi informado");
    }

    const materia = await RepositorioDeMateria.buscarUm(id);
    if (!materia) {
      throw new HttpError(404, "Matéria não encontrada!");
    }

    return materia;
  }

  async criar(nome, professorId, horario, duracao, sala) {
    const userSchema = z.object({
      nome: z
        .string({ required_error: "O nome é obrigatório." })
        .trim()
        .min(3, { message: "O nome deve conter pelo menos três caractere." }),
      professorId: z
        .number({ required_error: "O professor é obrigatório." })
        .int({ message: "O professor deve ser um número inteiro." })
        .positive({ message: "O professor deve ser um número positivo." }),
      horario: z.string({ required_error: "O horário é obrigatório." }),
      duracao: z
        .number({ required_error: "A duração é obrigatória." })
        .int({ message: "A duração deve ser um número inteiro." })
        .positive({ message: "A duração deve ser um número positivo." }),
      sala: z
        .string({ required_error: "A sala é obrigatório." })
        .min(3, { message: "A sala deve conter pelo menos três caractere." }),
    });

    const validacao = userSchema.safeParse({
      nome,
      professorId,
      horario,
      duracao,
      sala,
    });

    if (validacao.success === false) {
      return { error: validacao.error.format() };
    }

    return await RepositorioDeMateria.criar(validacao.data);
  }

  async atualizar(materiaId, dadosNovos) {
    const materiaExistente = await RepositorioDeMateria.buscarPeloId(materiaId);
    if (!materiaExistente) throw new HttpError(404, "Matéria não encontrada!");

    const { nome, professorId, horario, duracao, sala } = dadosNovos;

    const dadosAtualizados = {
      nome: nome ?? materiaExistente.nome,
      professorId: professorId ?? materiaExistente.professorId,
      horario: horario ?? materiaExistente.horario,
      duracao: duracao ?? materiaExistente.duracao,
      sala: sala ?? materiaExistente.sala,
    };

    return await RepositorioDeMateria.atualizar(materiaId, dadosAtualizados);
  }

  async remover(id) {
    const materiaExistente = await RepositorioDeMateria.buscarPeloId(id);
    if (!materiaExistente) {
      throw new HttpError(404, "Matéria não encontrada!");
    }

    return await RepositorioDeMateria.remover(id);
  }
}

module.exports = new ServicoDeMateria();
