import { IUser } from "@api/interfaces";

declare global {
  namespace Express {
    interface Request {
      user?: IUser | null;
    }
  }
}
