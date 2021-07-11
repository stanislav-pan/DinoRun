import { API_YANDEX } from "@api/consts";
import { IUser } from "@api/interfaces";
import { UserResponse } from "@api/types";
import { objToCamelCase } from "@utils/to-camel-case";

export class User {
  static mapUserFromServer(user: UserResponse): IUser {
    const transformedUser = objToCamelCase<IUser>(user);

    const { displayName, firstName = "", secondName = "" } = transformedUser;

    return {
      ...transformedUser,
      displayName: displayName || [firstName, secondName].join(" "),
      avatar: transformedUser.avatar && API_YANDEX + user.avatar,
    };
  }
}
