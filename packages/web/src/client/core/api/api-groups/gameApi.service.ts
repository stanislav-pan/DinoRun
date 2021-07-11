import { AxiosInstance, AxiosResponse } from "axios";

import { BaseApiService } from "@api/base-api.service";
import { Leader } from "@core/models/leaderboard";
import {
  LeaderboardNewLeaderRequestData,
  LeaderboardRequestData,
} from "@api/types";

export class GameApiService extends BaseApiService {
  constructor(private http: AxiosInstance) {
    super("leaderboard/");
  }

  public async leaderboardNewLeaderRequest(
    data: LeaderboardNewLeaderRequestData
  ): Promise<AxiosResponse<unknown>> {
    return this.http.post<unknown>(this.getUrl(""), data);
  }

  public async leaderboardRequest(
    data: LeaderboardRequestData
  ): Promise<AxiosResponse<Leader[]>> {
    return this.http.post<Leader[]>(this.getUrl("all"), data);
  }
}
