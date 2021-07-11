import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

import { BaseApiService } from "@api/base-api.service";
import {
  SigninRequest,
  SignupRequest,
  SignupResponse,
  UserResponse,
} from "@api/types";
import { IUser } from "@api/interfaces";
import { User } from "@core/models";

export class AuthApiService extends BaseApiService {
  constructor(private http: AxiosInstance) {
    super("auth/");
  }

  public async signup(
    data: SignupRequest
  ): Promise<AxiosResponse<SignupResponse>> {
    return this.http.post<SignupResponse>(this.getUrl("signup"), data);
  }

  public async signin(data: SigninRequest): Promise<AxiosResponse<unknown>> {
    return this.http.post<unknown>(this.getUrl("signin"), data);
  }

  public async logout(): Promise<unknown> {
    return this.http.post(this.getUrl("logout"));
  }

  public async fetchUser(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<IUser>> {
    return this.http
      .get<UserResponse>(this.getUrl("user"), config)
      .then((response) => {
        return { ...response, data: User.mapUserFromServer(response.data) };
      });
  }
}
