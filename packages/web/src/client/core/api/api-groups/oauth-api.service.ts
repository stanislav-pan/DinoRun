import { AxiosInstance, AxiosResponse } from "axios";
import { BaseApiService } from "@api/base-api.service";

export class OauthApiService extends BaseApiService {
  constructor(private http: AxiosInstance) {
    super("oauth/yandex/");
  }

  public async getServiceId(
    redirect_uri: string
  ): Promise<AxiosResponse<{ service_Id: string }>> {
    return this.http.get<{ service_Id: string }>(
      `${this.getUrl("service-id")}?redirect_uri=${redirect_uri}`
    );
  }

  public async signin(data: {
    code: string;
    redirect_uri: string;
  }): Promise<AxiosResponse<unknown>> {
    return this.http.post<unknown>(this.getUrl(""), data);
  }
}
