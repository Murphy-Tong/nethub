import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";
export declare class QueryDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectFieldWithValue(value: string, target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
}
export declare class QueryMapDecorator extends NetHubFieldDecorator<void> {
    name: string;
    collectField(target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
}
export declare const Query: IDecoratorWithValue<ParameterDecorator, string>;
export declare const QueryMap: ParameterDecorator;
