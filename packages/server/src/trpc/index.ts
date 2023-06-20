import * as auth from "./auth.js";
import * as news from "./news.js";
import * as retention from "./retention.js";
import { mergeRouters } from "./t.js";

export const app = mergeRouters(news.app, auth.app, retention.app);

export type App = typeof app;
