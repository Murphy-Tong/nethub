import "reflect-metadata";
import { ApiClient } from "../ApiClientImpl";
import { NetHubInterpreter } from "./define/decorator";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
export * from "./define";
export interface IService<T> {
    new (): T;
    new (NetHub: NetHub): T;
}
export declare function Service<T>(constructor: IService<T>): IService<T>;
export default class NetHub {
    private client;
    static addNetHubInterpreter(interpreter: NetHubInterpreter, target: object, ...path: string[]): void;
    static getNetHubInterpreter(target: object, ...path: string[]): NetHubInterpreter[] | undefined;
    setClient(client: ApiClient): this;
    getClient(): ApiClient | undefined;
    instance<T>(cls: IService<T>): T;
}
