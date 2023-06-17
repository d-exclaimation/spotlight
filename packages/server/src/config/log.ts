import { createConsola } from "consola";

/**
 * Logger instance
 */
export const consola = createConsola({
  fancy: true,
  formatOptions: {
    colors: true,
    date: true,
  },
});

/**
 * Returns the current date as an ISO string.
 */
export const now = () => new Date().toISOString();

/**
 * The HTTP method to icon mapping.
 */
export const icon = {
  GET: "📬",
  POST: "📮",
  PUT: "📫",
  DELETE: "📪",
  PATCH: "📝",
  OPTIONS: "📑",
  HEAD: "📄",
  CONNECT: "📞",
  TRACE: "📠",
  UNKNOWN: "📭",
} as Record<string, string>;
