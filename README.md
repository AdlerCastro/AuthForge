# 🛡️ AuthForge - Backend

API REST desenvolvida com Node.js e Fastify, estruturada em **MVC** e com autenticação baseada em JWT. Este repositório contém exclusivamente o **back-end** do sistema AuthForge.

🔗 A interface web (front-end) está disponível em:  
👉 [AuthForge Frontend Repository](https://github.com/AdlerCastro/AuthForge-Frontend.git)

---

## 📦 Tecnologias Utilizadas

- **Fastify** – Framework web de alta performance
- **TypeScript** – Tipagem estática
- **Prisma ORM** – ORM para PostgreSQL
- **PostgreSQL** – Banco de dados relacional
- **JWT (JSON Web Token)** – Autenticação
- **Swagger** – Documentação de rotas
- **Docker** – Contêiner para ambiente isolado
- **CI/CD** – Integração contínua com GitHub Actions

---

## 🧱 Arquitetura MVC

A aplicação segue a estrutura **Model-View-Controller**, distribuída em:

```

src/
├── controllers/
├── models/         # Prisma ORM
├── repositories/
├── routes/
├── services/
├── views/          # (Caso necessário para e-mails, templates, etc.)
├── server.ts       # Entry point

```

---

## 🔐 Funcionalidades da API

### 📌 Autenticação
- `POST /sign-in`: Login e geração de token
- `POST /sign-out`: Cadastro de novo usuário (email, senha, endereço, telefone, RG, data de nascimento)

### 👤 Usuários
- `GET /users`: Listagem de todos os usuários (admin)
- `GET /users/:id`: Buscar usuário pelo ID (admin)
- `POST /users`: Criar novo usuário (admin)
- `PUT /users/:id`: Atualizar usuário (admin)
- `PUT /me`: Usuário atualiza seus próprios dados

🛡️ Cargos: `admin` e `user` (com controle de permissões)

---

## 📑 Documentação da API

Acesse a documentação interativa no Swagger em:

```

[http://localhost:3333/docs](http://localhost:3333/docs)

````

---

## 📜 Scripts

```json
"scripts": {
  "build": "tsc --project tsconfig.json",
  "start": "node dist/server.js",
  "start:dev": "tsx --watch src/server.ts",
  "lint": "eslint src --ext .ts --fix",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
````

---

## 🐳 Rodando com Docker

### 1. Configure seu `.env` com base no `.env.example`

### 2. Inicie os containers:

```bash
docker-compose up --build
```

---

## 💻 Rodando Localmente (sem Docker)

### Instale as dependências:

```bash
pnpm install
```

### Execute em modo desenvolvimento:

```bash
pnpm start:dev
```

### Compilação para produção:

```bash
pnpm build
pnpm start
```

---

## ✅ Requisitos

* Node.js `>= 18.18.0`
* PNPM `>= 9.6.0`
* PostgreSQL local ou via Docker
* Prisma configurado (`pnpm prisma migrate dev`)

---

## ⚙️ CI com GitHub Actions

Este projeto utiliza **CI automática** via GitHub Actions para verificar:

* Formatação com Prettier
* Análise estática com ESLint
* Compilação com TypeScript

Arquivo de workflow: `.github/workflows/ci.yml`

---

## 📜 Autoria

Este projeto foi idealizado e desenvolvido por **Adler Castro**. Todos os direitos reservados.

> Desenvolvido por Adler Castro 🧠🚀