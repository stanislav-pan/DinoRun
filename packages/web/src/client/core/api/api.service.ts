import axios, { AxiosResponse } from "axios";
import { AuthApiService } from "./api-groups/auth-api.service";
import { OauthApiService } from "./api-groups/oauth-api.service";
import { DinoApiService } from "./api-groups/dino-api.service";
import { UsersApiService } from "./api-groups/users-api.service";
import { GameApiService } from "./api-groups/gameApi.service";
import { API_YANDEX } from "./consts";

export class ApiService {
  public auth: AuthApiService;
  public oauth: OauthApiService;
  public users: UsersApiService;
  public game: GameApiService;
  public dino: DinoApiService;

  constructor() {
    const service = axios.create({
      withCredentials: true,
      baseURL: API_YANDEX,
    });
    const forumService = axios.create({
      withCredentials: true,
    });
    service.interceptors.response.use(this.handleSuccess, this.handleError);

    this.auth = new AuthApiService(service);
    this.oauth = new OauthApiService(service);
    this.users = new UsersApiService(service);
    this.game = new GameApiService(service);
    this.dino = new DinoApiService(forumService);
  }

  private handleSuccess(
    response: AxiosResponse<any>
  ): AxiosResponse<any> | Promise<AxiosResponse<any>> {
    return response;
  }

  private handleError = (error: any): Promise<never> => {
    console.log(error.response.status);
    // TODO: handleError
    return Promise.reject(error);
  };
}

export const apiService = new ApiService();
