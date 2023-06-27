import * as auth from "./auth.js";
import * as dashboard from "./dashboard.js";
import * as news from "./news.js";
import { mergeRouters } from "./t.js";

export const app = mergeRouters(news.app, auth.app, dashboard.app);

export type App = typeof app;
