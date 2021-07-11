import { IUser } from "@api/interfaces";

export type OwnProps = {
  user: IUser | null;
  canEdit: boolean;
};

export type Props = OwnProps;
