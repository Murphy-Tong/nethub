import { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
import RetroFieldDecorator from "./define/field";
export declare class FieldDecorator extends RetroFieldDecorator<string> {
    name: string;
    collectFieldWithValue(target: Object, propertyKey: string, parameterIndex: number, value: string): RetroInterpreter;
}
export declare class FieldMapMapDecorator extends RetroFieldDecorator<string> {
    name: string;
    collectField(target: Object, propertyKey: string, parameterIndex: number): RetroInterpreter;
}
export declare const Field: IDecoratorWithValue<ParameterDecorator, string>;
export declare const FieldMap: ParameterDecorator;
