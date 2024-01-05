import { NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";
export declare class BodyDecorator extends NetHubFieldDecorator<string> {
    name: string;
    collectField(): NetHubInterpreter;
}
export declare const Body: ParameterDecorator;
