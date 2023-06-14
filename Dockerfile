FROM node:alpine

RUN npm install -g pnpm

RUN npm install -g turbo

COPY . .

RUN pnpm i

RUN turbo run build --filter @spotlight/server

CMD ["pnpm", "start"]