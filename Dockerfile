FROM node:alpine

RUN npm install -g pnpm
RUN npm install -g turbo
RUn npm install -g typescript

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
RUN pnpm install --force

# Get the rest of the files
COPY . .

# Install dependencies
RUN pnpm install

# Build
RUN turbo run build --filter=server

CMD ["pnpm", "start"]