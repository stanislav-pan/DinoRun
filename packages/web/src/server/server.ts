import path from "path";
import express, { Response } from "express";
import { renderFile } from "ejs";
import morgan from "morgan";

import { rendererMiddleware } from "./middlewares/renderer/renderer";
import { getAuthMiddleware } from "./middlewares/auth";

import { getYandexApiProxyMiddleware } from "./middlewares/yandex-api-proxy";
import { loadEnv } from "./env/index";
import { getHotReloadMiddleware } from "./middlewares/hot-reload";
import { getApiProxyMiddleware } from "./middlewares/api-proxy";
import { getOauthMiddleware } from "./middlewares/oauth";

const {
  DINORUN_WEB_PORT,
  DINORUN_PROXY_API,
  DINORUN_DOMAIN,
  DINORUN_API_PORT,
  DINORUN_API_DOMAIN,
} = loadEnv(NODE_ENV);

const app = express();
const port = (DINORUN_WEB_PORT && Number(DINORUN_WEB_PORT)) || 5000;

app.set("view engine", "ejs");
app.engine("html", renderFile);
app.set("views", path.join(__dirname, "views"));

app
  .use(morgan("dev"))
  .use(
    "/api/v2/",
    getYandexApiProxyMiddleware(DINORUN_PROXY_API, DINORUN_DOMAIN)
  )
  .use(
    "/inner-api/v1/",
    getAuthMiddleware(false),
    getApiProxyMiddleware(`http://${DINORUN_API_DOMAIN}:${DINORUN_API_PORT}`, {
      "^/inner-api/v1/": "",
    })
  );

if (NODE_ENV === "development") {
  app.use("/client/", express.static(path.join(__dirname, "client")));
}

if (IS_SSR) {
  app.get(
    "*",
    getOauthMiddleware(
      `http://${DINORUN_DOMAIN}:${
        NODE_ENV === "development" ? DINORUN_WEB_PORT : 80
      }/profile/`
    ),
    getAuthMiddleware(),
    rendererMiddleware
  );
} else {
  app.use(getHotReloadMiddleware()).get("*", (_, response: Response) => {
    response.sendFile(path.join(__dirname, "./client/index.html"));
  });
}

app.listen(port, () => {
  console.log(`App running at http://localhost:${port}`);
});
