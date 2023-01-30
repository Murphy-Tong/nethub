import "reflect-metadata";
import { ApiClient } from "../ApiClientImpl";
import { IService } from "../service";

export default class NetHub {
  private client: ApiClient | undefined;

  setClient(client: ApiClient) {
    this.client = client;
    return this;
  }

  getClient() {
    return this.client!;
  }

  create<T>(cls: IService<T>): T {
    return new cls(this);
  }
}

export * from "./define/cls";
export * from "./define/decorator";
export * from "./define/field";
export * from "./define/method";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
