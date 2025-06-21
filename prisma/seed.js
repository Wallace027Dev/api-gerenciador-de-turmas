const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");
require("dotenv").config();

const prisma = new PrismaClient();

async function main() {
  const senhaHash = await bcrypt.hash(
    process.env.ADMIN_PASSWORD,
    Number(process.env.SALT_ROUNDS)
  );

  await prisma.usuario.create({
    data: {
      nome: "admin",
      email: "admin@example.com",
      senha: senhaHash,
      cpf: "12345678910",
      role: "admin",
    },
  });

  console.log("Usuário admin criado com sucesso!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
