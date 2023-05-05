import { NetHubDecorator, IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
export declare class HeaderDecorator extends NetHubDecorator<[
    string,
    string
] | string> {
    name: string;
    collectFieldWithValue(value: string, target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
    collectMethodWithValue(value: [string, string], target: Object, propertyKey: string): NetHubInterpreter;
    regist(): IDecoratorWithValue<ParameterDecorator, string> & IDecoratorWithValue<MethodDecorator, [string, string]>;
}
export declare const Header: IDecoratorWithValue<MethodDecorator, [string, string]> & IDecoratorWithValue<ParameterDecorator, string>;
