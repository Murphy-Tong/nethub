import { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
import RetroMethodDecorator from "./define/method";
export declare class GetDecorator extends RetroMethodDecorator<string | {
    path: string;
    method: string;
}> {
    method: string;
    name: string;
    constructor(method?: string);
    collectMethodWithValue(target: Object, propertyKey: string, value: string | {
        path: string;
        method: string;
    }): RetroInterpreter;
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
