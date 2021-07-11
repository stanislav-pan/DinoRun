import React, { Component, ReactNode } from "react";
import { ErrorBoundaryProps, ErrorBoundaryState } from "./types";

export class ErrorBoundary extends Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render(): ReactNode {
    const { children, spareСomponent } = this.props;

    if (!this.state.hasError) {
      return children;
    }

    return spareСomponent || <h1>Что-то пошло не так.</h1>;
  }
}
