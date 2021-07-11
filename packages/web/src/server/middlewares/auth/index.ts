import { Request, Response, NextFunction } from "express";

import { apiService } from "@api/api.service";
import { ROUTES } from "@client/base-routes/routes";

export function getAuthMiddleware(useRedirectToProfile = true) {
  return async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const location = req.url;

    // TODO: Нужен рефактиронг middleware авторизации
    // В случае, если при получении пользователя возникла ошибка - редиректить на страницу авторизации
    if (location.includes("/docs/") || location.includes(".map")) {
      next();
      return;
    }

    if (location === "/favicon.ico") {
      return res.sendFile(__dirname + "/favicon.ico");
    }

    const cookieFromReq = req.headers.cookie;

    if (!cookieFromReq) {
      req.user = null;
      next();

      return;
    }

    try {
      const user = await apiService.auth
        .fetchUser({
          headers: {
            Cookie: cookieFromReq,
          },
        })
        .then(({ data }) => data);

      if (
        useRedirectToProfile &&
        (req.url === ROUTES.SIGN_IN || req.url === ROUTES.SIGN_UP)
      ) {
        res.redirect(ROUTES.PROFILE);
      }

      req.user = user;
    } catch (error) {
      console.error(error);

      req.user = null;
    }

    next();
  };
}
