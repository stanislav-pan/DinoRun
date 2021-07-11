import { ClientRequest } from "http";
import { RequestHandler } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";

import { parseAuthCookies } from "./parse-auth-cookies";

export const getYandexApiProxyMiddleware = (
  target: string,
  cookieDomainRewrite: string
): RequestHandler => {
  return createProxyMiddleware({
    target,
    changeOrigin: true,
    cookieDomainRewrite,
    secure: false,
    onProxyReq(proxyReq: ClientRequest) {
      const cookies = proxyReq.getHeaders().cookie as string;

      const { uuid, authCookie } = parseAuthCookies(cookies);

      if (!uuid || !authCookie) {
        return;
      }

      proxyReq.setHeader("cookie", `authCookie=${authCookie}; uuid=${uuid}`);
    },
    onProxyRes(proxyRes: any) {
      const sc = proxyRes.headers["set-cookie"];
      if (!Array.isArray(sc)) {
        return;
      }

      proxyRes.headers["set-cookie"] = sc.map((sc: string) => {
        return sc
          .split(";")
          .filter((v: string) => v.trim().toLowerCase() !== "secure")
          .filter((v: string) => !v.trim().includes("SameSite"))
          .join("; ");
      });
    },
  });
};
