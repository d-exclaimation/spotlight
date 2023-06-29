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
    credentials: true,
    methods: ["GET", "POST", "OPTIONS"],
    exposedHeaders: ["set-cookie"],
    origin: [
      "http://localhost:3000",
      "http://localhost:4000",
      "https://spotlight.d-exclaimation.me",
    ],
  }),
  createContext: async ({ req, res }) => {
    const authentication = await auth(req.headers);
    const ico = icon[req.method ?? "UNKNOWN"];
    const userinfo =
      authentication.kind === "user"
        ? `by ${authentication.username}`
        : authentication.kind === "direct"
        ? `using api key`
        : "";

    consola.info(`[${now()}] ${ico} ${req.method} on ${req.url} ${userinfo}`);

    return {
      headers: req.headers,
      res,
      auth: authentication,
    };
  },
});

// Start the server
server.listen(env.PORT);
consola.start(`[${now()}] 🚀 Running on http://localhost:${env.PORT}`);
