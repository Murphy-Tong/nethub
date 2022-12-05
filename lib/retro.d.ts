import "reflect-metadata";
import { ApiClient, Iterial, IRequestBody } from "./ApiClientImpl";
interface IService<T> {
    new (): T;
    new (retro: Retro): T;
}
export declare function GET(path?: string): (target: any, propertyKey: string) => void;
export declare function POST(path?: string): (target: any, propertyKey: string) => void;
declare type MethodDecorator = (target: Object, propertyKey: string) => void;
declare type FieldDecorator = (target: Object, propertyKey: string, parameterIndex: number) => void;
export declare function Query(name: string): FieldDecorator;
export declare function Query(name: string, value: Iterial): MethodDecorator;
export declare function Header(name: string): FieldDecorator;
export declare function Header(name: string, value: Iterial): MethodDecorator;
export declare function Field(name: string): FieldDecorator;
export declare function Field(name: string, value: Iterial): MethodDecorator;
export declare function Body(): FieldDecorator;
export declare function Body(value: IRequestBody): MethodDecorator;
export declare function Service(): <T>(constructor: IService<T>) => IService<T>;
export default class Retro {
    client: ApiClient;
    constructor(client: ApiClient);
    instance<T>(cls: IService<T>): T;
}
export {};
