FROM node:20

RUN npm install -g pnpm
WORKDIR /usr/src/app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install

COPY . .

RUN npx prisma generate

RUN pnpm build

RUN apt-get update -y && apt-get install -y openssl
EXPOSE 3333

CMD ["pnpm", "start"]