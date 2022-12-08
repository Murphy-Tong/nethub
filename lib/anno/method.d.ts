import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubMethodDecorator from "./define/method";
export declare class GetDecorator extends NetHubMethodDecorator<string | {
    path: string;
    method: string;
}> {
    method: string;
    name: string;
    constructor(method?: string);
    collectMethodWithValue(value: string | {
        path: string;
        method: string;
    }, target: Object, propertyKey: string): NetHubInterpreter;
}
export declare const GET: IDecoratorWithValue<MethodDecorator, string>;
export declare const POST: IDecoratorWithValue<MethodDecorator, string>;
export declare const PUT: IDecoratorWithValue<MethodDecorator, string>;
export declare const DELETE: IDecoratorWithValue<MethodDecorator, string>;
export declare const HEAD: IDecoratorWithValue<MethodDecorator, string>;
export declare const METHOD: IDecoratorWithValue<MethodDecorator, string | {
    path: string;
    method: string;
}>;
