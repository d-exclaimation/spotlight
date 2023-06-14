FROM node:alpine

RUN npm install -g pnpm

COPY . .

RUN pnpm i

RUN pnpm build --filter @spotlight/server

CMD ["pnpm", "start"]