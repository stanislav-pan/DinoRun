import { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import {
  CommentRequest,
  AddCommentResponse,
  TopicRequest,
  CreateTopicResponse,
  ReactionOfCommentRequest,
  ReactionOfCommentResponse,
} from "@api/types/forum.types";

export class DinoApiService {
  constructor(private http: AxiosInstance) {}

  protected getUrl(path = "", domain = ""): string {
    if (!domain) {
      domain = location.origin;
    }

    return `${domain}/inner-api/v1/${path}`;
  }

  public async fetchTopics(
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.http.get(this.getUrl("topics"), config).then((response) => {
      return { ...response, data: response.data.data };
    });
  }

  public async createTopic(
    data: TopicRequest
  ): Promise<AxiosResponse<CreateTopicResponse>> {
    return this.http.post<CreateTopicResponse>(this.getUrl("topics"), data);
  }

  public async fetchTopic(
    id: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse> {
    return this.http
      .get(this.getUrl(`topics/${id}`), config)
      .then((response) => {
        return { ...response, data: response.data.data };
      });
  }

  public async addComment(
    data: CommentRequest
  ): Promise<AxiosResponse<AddCommentResponse>> {
    return this.http.post<AddCommentResponse>(this.getUrl("comments"), data);
  }

  public async addReactionOfComment(
    data: ReactionOfCommentRequest
  ): Promise<ReactionOfCommentResponse> {
    return this.http
      .post<ReactionOfCommentResponse>(this.getUrl("reactions"), data)
      .then((response) => {
        return { data: response.data.data };
      });
  }

  public async removeReactionOfComment(
    reactionUsersId: string
  ): Promise<ReactionOfCommentResponse> {
    return this.http
      .delete<ReactionOfCommentResponse>(
        this.getUrl(`reactions/${reactionUsersId}`)
      )
      .then((response) => {
        return { data: response.data.data };
      });
  }

  public async fetchComments(
    topicId: string,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<any>> {
    return this.http
      .get<any>(this.getUrl(`comments?topicId=${topicId}`), config)
      .then((response) => {
        return { ...response, data: response.data };
      });
  }

  public async fetchThemes(
    config?: AxiosRequestConfig,
    domain?: string
  ): Promise<{
    data: {
      description: string;
      id: number;
      theme: string;
    }[];
  }> {
    return this.http
      .get<{
        data: {
          description: string;
          id: number;
          theme: string;
        }[];
      }>(this.getUrl("themes", domain), config)
      .then((response) => {
        return { data: response.data.data };
      });
  }

  public async fetchUserTheme(
    config?: AxiosRequestConfig,
    domain?: string
  ): Promise<{
    data: {
      description: string;
      id: number;
      theme: string;
    };
  }> {
    return this.http
      .get<{
        data: {
          description: string;
          id: number;
          theme: string;
        };
      }>(this.getUrl("themes/user", domain), config)
      .then((response) => {
        return { data: response.data.data };
      });
  }

  public async updateUserTheme(
    themeId: number
  ): Promise<{
    data: {
      description: string;
      id: number;
      theme: string;
    };
  }> {
    return this.http
      .patch<{
        data: {
          description: string;
          id: number;
          theme: string;
        };
      }>(this.getUrl("themes/user"), { themeId })
      .then((response) => {
        return { data: response.data.data };
      });
  }
}
