import { ParsedAuthCookies } from "./types";

export const parseAuthCookies = (cookies: string): ParsedAuthCookies => {
  let uuid = null;
  let authCookie = null;

  (cookies || "").split("; ").forEach((item) => {
    const [key, value] = item.split("=");

    if (key === "uuid") {
      uuid = value;
      return;
    }

    if (key === "authCookie") {
      authCookie = value;
    }
  });

  return { uuid, authCookie };
};
