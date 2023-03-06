import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubMethodDecorator from "./define/method";
export declare class UrlDecorator extends NetHubMethodDecorator<string> {
    collectMethodWithValue(value: string, target: Object, propertyKey: string): NetHubInterpreter;
}
export declare const URL: IDecoratorWithValue<MethodDecorator, string>;
