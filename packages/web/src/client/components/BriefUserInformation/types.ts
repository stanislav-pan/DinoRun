import { ReactElement } from "react";

export type OwnProps = {
  name: string;
  children: ReactElement;
  changeName?: (name: string) => void;
};

export type Props = OwnProps;
