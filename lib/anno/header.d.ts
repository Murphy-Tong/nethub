import NetHubDecorator, { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
export declare class HeaderDecorator extends NetHubDecorator<[string, string] | string> {
    name: string;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: string): NetHubInterpreter;
    collectMethodWithValue(target: Object, propertyKey: string, value: [string, string]): NetHubInterpreter;
    regist(): IDecoratorWithValue<ParameterDecorator, string> & IDecoratorWithValue<MethodDecorator, [string, string]>;
}
export declare const Header: IDecoratorWithValue<MethodDecorator, [string, string]> & IDecoratorWithValue<ParameterDecorator, string>;
