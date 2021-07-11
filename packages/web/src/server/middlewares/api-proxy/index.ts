import { ClientRequest } from "http";
import { RequestHandler, Request, Response } from "express";
import { createProxyMiddleware } from "http-proxy-middleware";
import { ROUTES } from "@client/base-routes/routes";

export const getApiProxyMiddleware = (
  target: string,
  pathRewrite: Record<string, string> = {}
): RequestHandler => {
  return createProxyMiddleware({
    target,
    pathRewrite,
    changeOrigin: true,
    onProxyReq: async function (
      proxyReq: ClientRequest,
      req: Request,
      res: Response
    ) {
      if (req.url.includes("docs/")) {
        return;
      }

      if (!req.user) {
        res.redirect(ROUTES.SIGN_IN);
        return;
      }

      proxyReq.setHeader("X-USER", encodeURI(JSON.stringify(req.user)));
    },
  });
};
