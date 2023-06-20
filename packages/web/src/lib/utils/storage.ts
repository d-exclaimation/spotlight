import { Auth } from "../types";

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
