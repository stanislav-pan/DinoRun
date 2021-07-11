import { isServer } from "@utils/is-server";
import { API_YANDEX } from "./consts";

export class BaseApiService {
  constructor(private prefix: string) {}

  protected getUrl(path = ""): string {
    let origin = API_YANDEX;

    if (!isServer) {
      origin = location.origin;
    }

    return `${origin}/api/v2/${this.prefix}${path}`;
  }
}
