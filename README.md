# 🛡️ AuthForge — Backend

Sistema de autenticação e gerenciamento de usuários baseado em **Fastify**, estruturado com **MVC**, autenticação via **JWT**, persistência com **Prisma ORM**, e infraestrutura escalável com **Docker** e **PostgreSQL**.

🔗 Frontend disponível em:  
👉 [AuthForge Frontend Repository](https://github.com/AdlerCastro/AuthForge-Frontend.git)

---

## 📦 Tecnologias Utilizadas

- **Node.js + Fastify** – Backend performático e modular
- **TypeScript** – Tipagem estática segura
- **Prisma ORM** – ORM moderno para PostgreSQL
- **PostgreSQL** – Banco relacional robusto
- **Zod** – Validações de entrada com schema
- **JWT** – Autenticação segura via token
- **Swagger** – Documentação automatizada da API
- **Docker** – Contêiner de aplicação e banco de dados
- **ESLint + Prettier** – Padrão e qualidade de código
- **CI/CD (GitHub Actions)** – Integração contínua para qualidade

---

## 🗂️ Estrutura do Projeto

Organização baseada em **MVC + módulos auxiliares**:

```
authforge/
├── prisma/
│   ├── schema.prisma          # Definição do banco (Prisma)
│   └── seed.ts                # População inicial
│
├── src/
│   ├── @types/                # Tipagens globais (Request, JWT)
│   ├── config/                # Configurações (env, segurança)
│   ├── controllers/           # Lógica de entrada e validação
│   ├── enum/                  # Enumerações (Role, etc)
│   ├── lib/                   # Instâncias e integrações (Prisma)
│   ├── middleware/            # Middlewares (auth, checkRole)
│   ├── models/                # Acesso direto ao banco (Prisma)
│   ├── routes/                # Mapeamento de rotas
│   ├── schemas/               # Validação de inputs (Zod)
│   ├── services/              # Regras de negócio e lógica
│   ├── types/                 # Tipos auxiliares
│   └── utils/                 # Funções utilitárias
│
├── server.ts                 # Arquivo principal
├── Dockerfile
├── docker-compose.yml
├── .env.example
```

---

## 🔐 Funcionalidades

### 🔑 Autenticação
- `POST /sign-in` → Login e retorno de JWT
- `DELETE /logout` → Remove cookie de autenticação
- `GET /me` → Dados do usuário autenticado

### 👤 Gestão de Usuários
- `GET /users` → Listagem (apenas admin)
- `GET /users/:id` → Usuário por ID (admin)
- `POST /admin` → Criar novo usuário (admin)
- `PATCH /admin/:id` → Editar usuário (admin)
- `DELETE /admin/:id` → Remover usuário (admin)

### 🛡️ Permissões
- Verificação por middleware `checkRole`
- Dois papéis: `ADMIN` e `USER`

---

## 📜 Documentação Swagger

Disponível automaticamente em:

```
http://localhost:3333/docs
```

---

## 🐳 Rodando com Docker

> ⚠️ Antes de iniciar, certifique-se de que o **PostgreSQL local** não está ocupando a **porta 5432**.  
> Caso esteja, **encerre o serviço** pelo Gerenciador de Tarefas (procure por `postgres`) para evitar conflitos com o container do Docker.

### Passos:

```bash
# 1. Configure seu arquivo .env com base em .env.example

# 2. Suba os containers com:
docker-compose up --build
```

Após isso, a API estará disponível em:

```
http://localhost:3333
```

---

## 💻 Rodando Localmente (sem Docker)

```bash
# Instalar dependências
pnpm install

# Gerar estrutura do banco de dados
pnpm prisma migrate dev

# Rodar em modo desenvolvimento
pnpm start:dev
```

### Produção

```bash
pnpm build
pnpm start
```

---

## 🌱 Conta de Administrador de Teste

Execute o seed para cadastrar um administrador:

```bash
pnpm seed
```

- ✉️ Email: `JohnDoe@example.com`  
- 🔒 Senha: `abcd1234`

---

## 📜 Scripts

```json
"scripts": {
  "build": "tsup src --out-dir build",
  "start": "node dist/server.js",
  "start:dev": "tsx --watch src/server.ts",
  "seed": "tsx prisma/seed.ts",
  "lint": "eslint \"{src,apps,libs,test}/**/*.ts\" --fix",
  "format": "prettier --check --ignore-path .gitignore .",
  "format:fix": "prettier --write --ignore-path .gitignore ."
}
```

---

## ⚙️ Integração Contínua

CI configurada com GitHub Actions para:

- ✅ Lint com **ESLint**
- ✅ Formatação com **Prettier**
- ✅ Compilação com **TypeScript (`tsup`)**

Arquivo de workflow: `.github/workflows/ci.yml`

---

## ✅ Requisitos

- Node.js `>= 18.18.0`
- PNPM `>= 9.6.0`
- PostgreSQL local ou via Docker
- Prisma instalado (`pnpm prisma generate`)

---

## 📜 Licença e Autoria

Este projeto foi idealizado e desenvolvido por **Adler Castro**.  
Todos os direitos reservados.

> Desenvolvido por Adler Castro 🧠🚀