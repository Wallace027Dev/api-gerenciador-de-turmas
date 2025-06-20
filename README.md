# Gerenciador de Turmas

## Objetivo final da API:
Ensinar na prática:

Estrutura de projeto Node modularizado

Validação com Zod

CRUD com Prisma + SQLite

Autenticação com JWT

Controle de acesso por role (aluno, professor, admin)

POO Básica (models, services, repositories)

## Funcionalidades por Role
📍 Rotas Gerais (acessível por todos usuários autenticados):
Rota	Descrição
GET /usuarios	Listar todos (sem senha no retorno)
GET /usuarios/:id	Buscar por ID
POST /usuarios	Cadastro (sempre cria com role "aluno")
POST /login	Login + geração de JWT
PUT /usuarios/:id	Atualizar dados
DELETE /usuarios/:id	Deletar usuário

📍 Rotas de Professores (role: professor):
Rota	Descrição
POST /materias	Criar matéria
GET /materias	Listar matérias
PUT /materias/:id	Atualizar matéria
DELETE /materias/:id	Deletar matéria

POST /turmas	Criar turma
GET /turmas	Listar turmas
PUT /turmas/:id	Atualizar turma
DELETE /turmas/:id	Deletar turma

POST /turmas/:id/alunos	Adicionar aluno na turma
GET /turmas/:id/alunos	Listar alunos da turma
DELETE /turmas/:id/alunos/:id	Remover aluno da turma

📍 Rotas de Admin (role: admin):
Rota	Descrição
POST /usuarios/professor	Criar novo usuário professor
(Além de todas as rotas acima)	Admin tem acesso total