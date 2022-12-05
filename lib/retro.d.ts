import "reflect-metadata";
import { ApiClient } from "./ApiClientImpl";
export declare function GET(path?: string): (target: any, propertyKey: string) => void;
export declare function POST(path?: string): (target: any, propertyKey: string) => void;
export declare function Query(name: string): (target: Object, propertyKey: string, parameterIndex: number) => void;
export declare function Field(name: string): (target: Object, propertyKey: string, parameterIndex: number) => void;
interface IService<T> {
    new (): T;
    new (retro: Retro): T;
}
export declare function Service(): <T>(constructor: IService<T>) => IService<T>;
export default class Retro {
    client: ApiClient;
    constructor(client: ApiClient);
    instance<T>(cls: IService<T>): T;
}
export {};
