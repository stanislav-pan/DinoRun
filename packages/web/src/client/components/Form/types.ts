import { FormHTMLAttributes, ReactNode } from "react";

export type OwnProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

export type Props = OwnProps;
