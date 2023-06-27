FROM node:alpine as base

# --- Docker optimisation image ---
FROM base as optimiser

RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g turbo

WORKDIR /app
COPY . .
RUN turbo prune --scope=@spotlight/server --docker

# --- Build image ---
FROM base as builder
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g turbo
RUN npm install -g pnpm
RUN npm install -g tsup

WORKDIR /app
COPY .gitignore .gitignore
COPY --from=optimiser /app/out/json/ .
COPY --from=optimiser /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch
RUN pnpm install

COPY --from=optimiser /app/out/full/ .
RUN turbo run build --filter=@spotlight/server

# --- Runner image ---
FROM base as runner

RUN npm install -g pnpm

WORKDIR /app
COPY --from=builder /app/ .

CMD ["pnpm", "start"]