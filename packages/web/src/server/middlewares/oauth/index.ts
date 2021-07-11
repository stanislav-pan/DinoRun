import { Request, Response, NextFunction } from "express";
import setCookie from "set-cookie-parser";

import { apiService } from "@api/api.service";

export function getOauthMiddleware(redirectUri: string) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const location = req.url;

    console.log("OAuth Middleware", location);

    if (!location.includes("/?code=")) {
      next();

      return;
    }

    const code = location.replace("/?code=", "");

    try {
      const oauthRes = await apiService.oauth.signin({
        code,
        redirect_uri: redirectUri,
      });

      const data = setCookie.parse(oauthRes.headers["set-cookie"]);

      data.forEach((cookie) => {
        res.cookie(cookie.name, cookie.value);
      });

      res.redirect(redirectUri);
    } catch (error) {
      console.error(error);
    }

    next();
  };
}
