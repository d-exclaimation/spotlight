import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { env } from "./config/env.js";
import { consola, icon, now } from "./config/log.js";
import "./data/index.js";
import { app } from "./trpc/index.js";
import { auth } from "./utils/auth.js";

/**
 * The trpc Node.js HTTP server.
 */
const server = createHTTPServer({
  router: app,
  middleware: cors({
    methods: ["GET", "POST", "OPTIONS"],
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://spotlight.d-exclaimation.me",
    ],
  }),
  createContext: async ({ req }) => {
    const user = await auth(req.headers);
    const ico = icon[req.method ?? "UNKNOWN"];
    const userinfo = user ? `by ${user.username}` : "";
    consola.info(`[${now()}] ${ico} ${req.method} on ${req.url} ${userinfo}`);
    return {
      headers: req.headers,
      user,
    };
  },
});

// Start the server
server.listen(env.PORT);
consola.start(`[${now()}] 🚀 Running on http://localhost:${env.PORT}`);
