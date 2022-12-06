import { HttpRequestConfig } from "../../ApiClientImpl";
export declare type IDecoratorWithValue<D, V = string> = (value: V) => D;
export interface RetroInterpreter {
    (currentRequestConfig: HttpRequestConfig, targetServiceConstructor: object, methodName: string | Symbol, argumentValue?: any, argumentIndex?: number): HttpRequestConfig;
}
export declare function NOOPRetroInterpreter(currentRequestConfig: HttpRequestConfig): HttpRequestConfig;
export default class RetroDecorator<V = any> {
    name: string;
    collectService(cls: object): RetroInterpreter;
    collectServiceWithValue(cls: object, value: V): RetroInterpreter;
    collectMethod(target: Object, propertyKey: string): RetroInterpreter;
    collectMethodWithValue(target: Object, propertyKey: string, value: V): RetroInterpreter;
    collectField(target: Object, propertyKey: string, parameterIndex: number): RetroInterpreter;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: V): RetroInterpreter;
}
