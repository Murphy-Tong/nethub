import "reflect-metadata";
import { ApiClient } from "../ApiClientImpl";
export interface IService<T> {
    new (): T;
    new (NetHub: NetHub): T;
}
export declare function Service(host: string): <T>(constructor: IService<T>) => IService<T>;
export declare function Service<T>(constructor: IService<T>): IService<T>;
export default class NetHub {
    private client;
    setClient(client: ApiClient): this;
    getClient(): ApiClient | undefined;
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
