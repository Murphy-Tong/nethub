import { HttpRequestConfig } from "../../ApiClientImpl";
export declare type IDecoratorWithValue<D, V = string> = (value: V) => D;
export interface NetHubInterpreter {
    (currentRequestConfig: HttpRequestConfig, targetServiceConstructor: object, methodName: string | Symbol, argumentValue?: any, argumentIndex?: number): HttpRequestConfig;
}
export declare function NOOPNetHubInterpreter(currentRequestConfig: HttpRequestConfig): HttpRequestConfig;
export default class NetHubDecorator<V = any> {
    name: string;
    collectService(cls: object): NetHubInterpreter;
    collectServiceWithValue(cls: object, value: V): NetHubInterpreter;
    collectMethod(target: Object, propertyKey: string): NetHubInterpreter;
    collectMethodWithValue(target: Object, propertyKey: string, value: V): NetHubInterpreter;
    collectField(target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: V): NetHubInterpreter;
}
