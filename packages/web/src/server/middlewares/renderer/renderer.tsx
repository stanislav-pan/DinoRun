import path from "path";
import React, { StrictMode } from "react";
import ReactDOM from "react-dom/server";
import { Provider } from "react-redux";
import { StaticRouter } from "react-router-dom";
import { StaticRouterContext } from "react-router";
import { Request, Response } from "express";
import { ChunkExtractor } from "@loadable/server";
import serialize from "serialize-javascript";

import { apiService } from "@api/api.service";
import { configureStore } from "@redux/index";
import App from "@pages/App";
import { fetchUserS } from "@redux/user/actions";

import { env } from "../../env/index";
import { extractStyles } from "./extract-styles";

const statsFile = path.resolve("dist/client/loadable-stats.json");

export async function rendererMiddleware(
  req: Request,
  res: Response
): Promise<void> {
  console.log("Render React", req.url);

  const location = req.url;

  const context: StaticRouterContext = {};

  const { store } = configureStore();
  const extractor = new ChunkExtractor({ statsFile });

  if (req.user) {
    const apiUrl = `http://${env.DINORUN_DOMAIN}:${env.DINORUN_WEB_PORT}`;

    const headers = {
      cookie: req.headers["cookie"],
    };

    const userTheme = await apiService.dino.fetchUserTheme({ headers }, apiUrl);
    const themes = await apiService.dino.fetchThemes({ headers }, apiUrl);

    store.dispatch(
      fetchUserS({
        user: req.user,
        userTheme: userTheme.data,
        allThemes: themes.data,
      })
    );
  }

  const reactHtml = ReactDOM.renderToString(
    extractor.collectChunks(
      <StrictMode>
        <StaticRouter context={context} location={location}>
          <Provider store={store}>
            <App />
          </Provider>
        </StaticRouter>
      </StrictMode>
    )
  );

  const initialState = store.getState();

  if (context.url) {
    res.redirect(context.url);

    return;
  }

  const { inlineStyles, styleTags } = await extractStyles(extractor);

  const scripts = extractor.getScriptTags();

  res.render("index.ejs", {
    isClientTempate: false,
    reactApp: reactHtml,
    inlineStyles,
    styleTags,
    scripts,
    initialState: serialize(initialState, { isJSON: true }),
  });
}

export default rendererMiddleware;
