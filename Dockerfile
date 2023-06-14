FROM node:alpine

RUN npm install -g pnpm

RUN npm install -g turbo

COPY . .

RUN pnpm install

RUN pnpm install --filter @spotlight/server

RUN turbo run build --filter @spotlight/server

CMD ["pnpm", "start"]