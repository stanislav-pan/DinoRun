import React, { FC } from "react";

export const Spinner: FC = () => (
  <span className="mx-auto mt-5 flex h-10 w-10">
    <span className="animate-ping absolute inline-flex rounded-full h-10 w-10 bg-purple-400 opacity-75" />
    <span className="m-auto relative inline-flex rounded-full h-10 w-10 bg-purple-500" />
  </span>
);
