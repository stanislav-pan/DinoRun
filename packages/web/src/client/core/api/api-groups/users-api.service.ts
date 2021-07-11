import { AxiosInstance, AxiosResponse } from "axios";

import { BaseApiService } from "@api/base-api.service";
import {
  ChangePasswordRequest,
  ChangeProfileRequest,
  UserResponse,
} from "@api/types";
import { User } from "@core/models";
import { objToSnakeCase } from "@utils/to-snake-case";
import { IUser } from "@api/interfaces";

export class UsersApiService extends BaseApiService {
  constructor(private http: AxiosInstance) {
    super("user/");
  }

  public async changePassword(data: ChangePasswordRequest): Promise<unknown> {
    return this.http.put(this.getUrl("password"), data);
  }

  public async changeAvatar(file: File): Promise<AxiosResponse<IUser>> {
    const data = new FormData();
    data.append("avatar", file);

    return this.http
      .put<UserResponse>(this.getUrl("profile/avatar"), data, {
        headers: {
          "content-type": "",
        },
      })
      .then((response) => {
        return { ...response, data: User.mapUserFromServer(response.data) };
      });
  }

  public async changeProfile(
    data: ChangeProfileRequest
  ): Promise<AxiosResponse<IUser>> {
    return this.http
      .put(this.getUrl("profile"), objToSnakeCase(data))
      .then((response) => {
        return { ...response, data: User.mapUserFromServer(response.data) };
      });
  }
}
