const z = require("zod");

const EsquemaDeMateria = z.object({
  nome: z
    .string({ required_error: "O nome é obrigatório." })
    .trim()
    .min(3, { message: "O nome deve conter pelo menos três caractere." }),
  professorId: z
    .number({ required_error: "O professor é obrigatório." })
    .int({ message: "O professor deve ser um número inteiro." })
    .positive({ message: "O professor deve ser um número positivo." }),
});

function validadorDeMateria(dados) {
  const validacao = EsquemaDeMateria.safeParse(dados);

  if (!validacao.success) {
    return { error: validacao.error.format() };
  }

  return { error: null };
}

module.exports = validadorDeMateria;
