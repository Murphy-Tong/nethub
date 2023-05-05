import { NetHubDecorator, IDecoratorWithValue } from "./decorator";
export declare class NetHubFieldDecorator<V = any> extends NetHubDecorator {
    regist(): IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator;
}
