FROM node:alpine as base

# --- Stage 1: Optimisation and pruning ---
FROM base as optimiser

# Getting required tools
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g turbo

# Pruning
WORKDIR /app
COPY . .
RUN turbo prune --scope=@spotlight/server --docker

# -----------------------------------------

# --- Stage 2: Dependencies and building ---
FROM base as builder

# Getting required tools
RUN apk add --no-cache libc6-compat
RUN apk update
RUN npm install -g turbo
RUN npm install -g pnpm
RUN npm install -g tsup

# Dependencies
WORKDIR /app
COPY .gitignore .gitignore
COPY --from=optimiser /app/out/json/ .
COPY --from=optimiser /app/out/pnpm-lock.yaml ./pnpm-lock.yaml
RUN pnpm fetch
RUN pnpm install

# Building
COPY --from=optimiser /app/out/full/ .
RUN turbo run build --filter=@spotlight/server

# -----------------------------------------

# --- Stage 3: Setting up runner image ---
FROM base as runner

# Getting the build output
WORKDIR /app
COPY --from=builder /app/ .

CMD ["node", "packages/server/dist/index.js"]

# -----------------------------------------