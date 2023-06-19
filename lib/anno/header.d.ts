import { IDecoratorWithValue, NetHubDecorator, NetHubInterpreter } from "./define/decorator";
export declare class HeaderDecorator extends NetHubDecorator<string[] | string> {
    name: string;
    collectFieldWithValue(value: string): NetHubInterpreter;
    addHeader(headers: Record<string, any>, key: string, value: string): void;
    collectMethodWithValue(value: string[]): NetHubInterpreter;
    regist(): IDecoratorWithValue<ParameterDecorator, string> & IDecoratorWithValue<MethodDecorator, [string, string]>;
}
export declare const Header: IDecoratorWithValue<MethodDecorator, [string, string]> & IDecoratorWithValue<ParameterDecorator, string>;
