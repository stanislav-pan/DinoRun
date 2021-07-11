import { IUser } from "@api/interfaces";

export type ChangeProfileRequest = Partial<Omit<IUser, "id" | "avatar">>;
