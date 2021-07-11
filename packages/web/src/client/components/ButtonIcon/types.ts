import { ButtonHTMLAttributes, ReactNode } from "react";

export type OwnProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  children: ReactNode;
};

export type Props = OwnProps;
