import cors from "cors";
import { env } from "./config/env.js";
import "./data/index.js";
import { app } from "./trpc/index.js";

import { createHTTPServer } from "@trpc/server/adapters/standalone";

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
    return {
      headers: req.headers,
    };
  },
});

server.listen(env.PORT);
console.log(`🚀 Running on http://localhost:${env.PORT}`);
