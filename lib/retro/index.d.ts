import "reflect-metadata";
import { ApiClient } from "../ApiClientImpl";
import { RetroInterpreter } from "./define/decorator";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
export * from "./define";
export interface IService<T> {
    new (): T;
    new (retro: Retro): T;
}
export declare function Service<T>(constructor: IService<T>): IService<T>;
export default class Retro {
    private client;
    static addRetroInterpreter(interpreter: RetroInterpreter, target: object, ...path: string[]): void;
    static getRetroInterpreter(target: object, ...path: string[]): RetroInterpreter[] | undefined;
    setClient(client: ApiClient): this;
    getClient(): ApiClient | undefined;
    instance<T>(cls: IService<T>): T;
}
