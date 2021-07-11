import React, { FC } from "react";
import { ErrorBoundary } from "@components/ErrorBoundary";
import { AuthContext } from "@hooks/useAuth";
import { useProvideAuth } from "@hooks/useProvideAuth";
import { BaseRoutes } from "@client/base-routes";

export const App: FC = () => {
  const auth = useProvideAuth();

  return (
    <AuthContext.Provider value={auth}>
      <ErrorBoundary>
        <BaseRoutes />
      </ErrorBoundary>
    </AuthContext.Provider>
  );
};
