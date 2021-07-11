import { createContext, useContext } from "react";
import { UseProvideAuth } from "./useProvideAuth";

export const AuthContext = createContext<UseProvideAuth | null>(null);

export const useAuth = (): UseProvideAuth => {
  return useContext(AuthContext as React.Context<UseProvideAuth>);
};
