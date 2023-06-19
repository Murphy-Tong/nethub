import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";
export declare class FieldDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectFieldWithValue(value: string): NetHubInterpreter;
}
export declare class FieldMapMapDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectField(): NetHubInterpreter;
}
export declare const Field: IDecoratorWithValue<ParameterDecorator, string>;
export declare const FieldMap: ParameterDecorator;
