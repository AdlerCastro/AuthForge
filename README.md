# 🛡️ AuthForge

Sistema de autenticação e gerenciamento de usuários com controle de acesso baseado em cargos (`admin` e `user`). A aplicação é composta por uma API REST desenvolvida em Node.js com Fastify no back-end e uma interface em React com Next.js no front-end.

---

## 📦 Tecnologias Utilizadas

### 🔧 Backend
- **Fastify** – Framework web de alta performance para Node.js
- **Prisma ORM** – ORM moderno e intuitivo para PostgreSQL
- **PostgreSQL** – Banco de dados relacional
- **TypeScript** – Tipagem estática para JavaScript
- **JWT (JSON Web Token)** – Autenticação segura
- **Docker** – Contêineres para desenvolvimento e deploy

### 🎨 Frontend
- **Next.js 15 (App Router)** – Framework React full-stack
- **React Query (Tanstack Query)** – Gerenciamento de dados e cache
- **Axios** – Requisições HTTP
- **Tailwind CSS** – Estilização utilitária
- **JWT** – Autenticação e autorização

---

## 🔐 Funcionalidades da API

### 📌 Autenticação
- `POST /sign-in`: Login com e-mail e senha, retorna token JWT
- `POST /sign-out`: Cadastro de usuário com:
  - Email
  - Senha
  - Endereço
  - Telefone
  - RG
  - Data de nascimento

### 👤 Usuários
- `GET /users`: Lista todos os usuários (admin)
- `GET /users/:id`: Busca um usuário pelo ID
- `POST /users`: Criação de usuário (admin)
- `PUT /users/:id`: Atualização de usuário (admin)
- `PUT /me`: Atualização dos próprios dados (user)
- Cargos: `admin`, `user` (com controle de permissões)

---

## 🧪 Scripts Úteis

### Backend (Fastify)
```json
"scripts": {
  "start": "tsx src/server.ts",
  "lint": "eslint src --ext .ts --fix",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
```

### Frontend (Next.js)
```json
"scripts": {
  "dev": "next dev --turbopack",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
```

---

## 🐳 Rodando o Projeto com Docker

### 1. Clone o repositório
```bash
git clone https://github.com/seu-usuario/authforge.git
cd authforge
```

### 2. Crie o arquivo `.env` com as variáveis necessárias (exemplo no `.env.example`)

### 3. Suba os containers
```bash
docker-compose up --build
```

> Isso irá iniciar tanto o backend quanto o banco de dados PostgreSQL.

---

## 🛠️ Configuração Manual

### Backend
```bash
pnpm install
pnpm prisma generate
pnpm prisma migrate dev
pnpm start
```

### Frontend
```bash
pnpm install
pnpm dev
```

---

## 📁 Estrutura de Pastas

```
authforge/
├── backend/
│   ├── src/
│   └── prisma/
├── frontend/
│   ├── app/
│   └── components/
```

---

## 🚀 Requisitos

- Node.js `>= 18.18.0`
- PNPM `>= 9.6.0`
- Docker (para uso com contêineres)
- PostgreSQL (caso opte por rodar local sem Docker)

---

## 🛡️ Controle de Acesso

| Rota                  | Método | Acesso    |
|-----------------------|--------|-----------|
| /sign-in              | POST   | Público   |
| /sign-out             | POST   | Público   |
| /users                | GET    | Admin     |
| /users/:id            | GET    | Admin     |
| /users                | POST   | Admin     |
| /users/:id            | PUT    | Admin     |
| /me                   | PUT    | User      |

---

> Desenvolvido por Adler Castro 🧠🚀