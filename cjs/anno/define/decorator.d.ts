import { HttpRequestConfig } from "../../ApiClientImpl";
export declare type IDecoratorWithValue<D, V = string> = (value: V) => D;
export interface NetHubInterpreter {
    (currentRequestConfig: HttpRequestConfig, argumentValue: any, targetServiceConstructor: object, methodName: string | Symbol, argumentIndex?: number): HttpRequestConfig | Promise<HttpRequestConfig>;
}
export declare function NOOPNetHubInterpreter(currentRequestConfig: HttpRequestConfig): HttpRequestConfig;
export declare class NetHubDecorator<V = any> {
    name: string;
    collectClass(cls: object): NetHubInterpreter;
    collectClassWithValue(value: V, cls: object): NetHubInterpreter;
    collectMethod(target: Object, propertyKey: string): NetHubInterpreter;
    collectMethodWithValue(value: V, target: Object, propertyKey: string): NetHubInterpreter;
    collectField(target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
    collectFieldWithValue(value: V, target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
}
