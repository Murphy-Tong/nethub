import { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
import RetroFieldDecorator from "./define/field";
export declare class QueryDecorator extends RetroFieldDecorator<string> {
    name: string;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: string): RetroInterpreter;
}
export declare class QueryMapDecorator extends RetroFieldDecorator<void> {
    name: string;
    collectField(target: Object, propertyKey: string, parameterIndex: number): RetroInterpreter;
}
export declare const Query: IDecoratorWithValue<ParameterDecorator, string>;
export declare const QueryMap: ParameterDecorator;
