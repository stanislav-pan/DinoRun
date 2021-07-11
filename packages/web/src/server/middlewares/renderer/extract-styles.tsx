import React from "react";
import { ChunkExtractor } from "@loadable/server";
import { renderToStaticMarkup } from "react-dom/server";

import { ExtactedStyles } from "./types";

export const extractStyles = async (
  extractor: ChunkExtractor
): Promise<ExtactedStyles> => {
  /** Все стили, которые необходимы для отображения запрашиваемой страницы */
  const inlineStyles = await extractor.getCssString();
  const styleElements = extractor.getStyleElements();

  const filteredStyleElements = styleElements.filter((element) => {
    return (
      (element.props as { ["data-chunk"]: string })["data-chunk"] !== "main"
    );
  });

  const styleTags = renderToStaticMarkup(<>{...filteredStyleElements}</>);

  return { inlineStyles, styleTags };
};
