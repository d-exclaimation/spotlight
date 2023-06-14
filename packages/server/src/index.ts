import { env } from "./config/env.js";
import "./data/index.js";
import { app } from "./trpc/index.js";

import { createHTTPServer } from "@trpc/server/adapters/standalone";

const server = createHTTPServer({
  router: app,
});

server.listen(env.PORT);
console.log(`🚀 Running on http://localhost:${env.PORT}`);
