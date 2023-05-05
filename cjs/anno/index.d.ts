import "reflect-metadata";
import { ApiClient } from "../ApiClientImpl";
import { IService } from "./service";
export declare class NetHub {
    private client;
    setClient(client: ApiClient): this;
    getClient(): ApiClient;
    create<T>(cls: IService<T>): T;
}
export * from "./define/cls";
export * from "./define/decorator";
export * from "./define/field";
export * from "./define/method";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
export * from "./service";
export * from "./host";
export * from "./url";
