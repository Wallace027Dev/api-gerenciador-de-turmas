# 📚 API - Gerenciador de Turmas (Prismatech)

## ✅ Objetivo desta API

Este projeto serve como **material didático** para uma turma de programação iniciante/intermediária. Aqui vamos ensinar, na prática:

- Estrutura de projeto Node.js modularizado
- CRUD com Prisma ORM + SQLite
- Validação de dados com Zod
- Autenticação com JWT
- Controle de acesso por Role (aluno, professor, admin)
- POO básica (Separação de Models, Services e Repositories)

---

## ✅ Tecnologias utilizadas

- Node.js
- Express
- Prisma ORM
- SQLite
- JWT
- Zod
- bcrypt

---

## ✅ Estrutura de projeto

```
src/
├── controllers/
├── services/
├── repositories/
├── models/
├── middlewares/
├── routes/
├── utils/
└── prisma/
```

---

## ✅ Banco de dados

Banco usado: **SQLite**  
ORM: **Prisma**

Rodar migrations:

```bash
npx prisma migrate dev
```

---

## ✅ Coleção no Postman

[👉 Link para a coleção](https://www.postman.com/cryosat-explorer-1990878/workspace/prismatech/collection/38333534-130441d0-fc6c-4e1c-a4d0-c3a347e82a61?action=share&creator=38333534)

---

## ✅ Funcionalidades por Role (controle de acesso)

### 📍 Rotas Gerais (Usuário autenticado - qualquer role)

| Método | Rota | Descrição |
|--|--|--|
| `GET` | `/usuarios` | Listar todos os usuários (senha não aparece) |
| `GET` | `/usuarios/:id` | Buscar usuário por ID |
| `POST` | `/usuarios` | Cadastrar usuário (sempre com role "aluno") |
| `POST` | `/login` | Login + geração de JWT |
| `PUT` | `/usuarios/:id` | Atualizar dados do usuário |
| `DELETE` | `/usuarios/:id` | Deletar usuário |

---

### 📍 Rotas de Professor (`role: professor`)

**CRUD de Matérias:**

| Método | Rota | Descrição |
|--|--|--|
| `POST` | `/materias` | Criar matéria |
| `GET` | `/materias` | Listar matérias |
| `PUT` | `/materias/:id` | Atualizar matéria |
| `DELETE` | `/materias/:id` | Deletar matéria |

**CRUD de Turmas:**

| Método | Rota | Descrição |
|--|--|--|
| `POST` | `/turmas` | Criar turma |
| `GET` | `/turmas` | Listar turmas |
| `PUT` | `/turmas/:id` | Atualizar turma |
| `DELETE` | `/turmas/:id` | Deletar turma |

**Gerenciar alunos nas turmas:**

| Método | Rota | Descrição |
|--|--|--|
| `POST` | `/turmas/:id/alunos` | Adicionar alunos na turma |
| `GET` | `/turmas/:id/alunos` | Listar alunos da turma |
| `DELETE` | `/turmas/:id/alunos/:alunoId` | Remover aluno da turma |

---

### 📍 Rotas de Admin (`role: admin`)

| Método | Rota | Descrição |
|--|--|--|
| `POST` | `/usuarios/professor` | Criar novo usuário com role "professor" |
| | ✅ Além disso, o admin pode acessar todas as rotas acima |

---

## ✅ Como rodar o projeto localmente

```bash
npm install
npx prisma migrate dev
npm run dev
```
