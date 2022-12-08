import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubFieldDecorator from "./define/field";
export declare class FieldDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectFieldWithValue(value: string, target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
}
export declare class FieldMapMapDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectField(target: Object, propertyKey: string, parameterIndex: number): NetHubInterpreter;
}
export declare const Field: IDecoratorWithValue<ParameterDecorator, string>;
export declare const FieldMap: ParameterDecorator;
