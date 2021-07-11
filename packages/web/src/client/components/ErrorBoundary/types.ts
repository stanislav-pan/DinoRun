import { ReactNode } from "react";

export type ErrorBoundaryProps = {
  spareСomponent?: ReactNode;
};

export type ErrorBoundaryState = {
  hasError: boolean;
};
