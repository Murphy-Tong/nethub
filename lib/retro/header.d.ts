import RetroDecorator, { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
export declare class HeaderDecorator extends RetroDecorator<[string, string] | string> {
    name: string;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: string): RetroInterpreter;
    collectMethodWithValue(target: Object, propertyKey: string, value: [string, string]): RetroInterpreter;
    regist(): IDecoratorWithValue<ParameterDecorator, string> & IDecoratorWithValue<MethodDecorator, [string, string]>;
}
export declare const Header: IDecoratorWithValue<MethodDecorator, [string, string]> & IDecoratorWithValue<ParameterDecorator, string>;
