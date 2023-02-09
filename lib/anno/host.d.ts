import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubMethodDecorator from "./define/method";
export declare class HostDecorator extends NetHubMethodDecorator<string> {
    collectMethodWithValue(value: string, target: Object, propertyKey: string): NetHubInterpreter;
}
export declare const HOST: IDecoratorWithValue<MethodDecorator, string>;
