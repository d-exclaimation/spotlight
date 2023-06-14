FROM node:alpine

RUN npm install -g pnpm
RUN npm install -g turbo
RUN npm install -g tsup

# Root configs
COPY package.json .
COPY pnpm-lock.yaml .
COPY pnpm-workspace.yaml .
COPY turbo.json .

# Copy workspaces' package.json
COPY packages/server/package.json .

# Fetch
RUN pnpm fetch 

# Install dependencies
RUN pnpm install

# Get the rest of the files
COPY . .

# Build
RUN turbo run build --filter=server

CMD ["pnpm", "start"]