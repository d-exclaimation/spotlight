import { Auth, datestring } from "../types";

/**
 * Storage for auth data
 */
export const auth = {
  get: () => {
    const raw = localStorage.getItem("auth");
    if (!raw) {
      return undefined;
    }
    const parsed = JSON.parse(raw);
    const res = Auth.safeParse(parsed);
    if (!res.success) {
      return undefined;
    }
    return res.data;
  },
  set: (data: Auth) => {
    localStorage.setItem("auth", JSON.stringify(data));
  },
  clear: () => {
    localStorage.removeItem("auth");
  },
};

/**
 * Storage for auth data
 */
export const tracking = {
  get: () => {
    const raw = localStorage.getItem("time");
    if (!raw) {
      return undefined;
    }
    const parsed = datestring.safeParse(raw);
    if (!parsed.success) {
      return undefined;
    }
    return parsed.data;
  },
  set: (data: Date) => {
    localStorage.setItem("time", data.toISOString());
  },
  clear: () => {
    localStorage.removeItem("time");
  },
};
