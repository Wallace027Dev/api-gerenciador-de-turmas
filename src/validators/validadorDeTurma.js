const z = require("zod");

const EsquemaDeTurma = z.object({
      professorId: z
        .number({ required_error: "O professor é obrigatório." })
        .int({ message: "O professor deve ser um número inteiro." })
        .positive({ message: "O professor deve ser um número positivo." }),
      materiaId: z
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

function validadorDeTurma(dados) {
  const validacao = EsquemaDeTurma.safeParse(dados);

  if (!validacao.success) {
    return { error: validacao.error.format() };
  }

  return { error: null };
}

module.exports = validadorDeTurma;