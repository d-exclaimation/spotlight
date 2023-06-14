FROM node:alpine

RUN npm install -g pnpm

RUN npm install -g turbo

COPY . .

RUN pnpm i --frozen-lockfile

RUN turbo run build --filter @spotlight/server

CMD ["pnpm", "start"]