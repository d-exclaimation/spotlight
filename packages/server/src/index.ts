import { createHTTPServer } from "@trpc/server/adapters/standalone";
import cors from "cors";
import { env } from "./config/env.js";
import "./data/index.js";
import { app } from "./trpc/index.js";

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
  createContext: ({ req }) => {
    console.log(`-- 📬 ${req.method} :: ${req.url}`);
    return {
      headers: req.headers,
    };
  },
});

// Start the server
server.listen(env.PORT);
console.log(`🚀 Running on http://localhost:${env.PORT}`);
