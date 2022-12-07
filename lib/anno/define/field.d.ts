import NetHubDecorator, { IDecoratorWithValue } from "./decorator";
export default class NetHubFieldDecorator<V = any> extends NetHubDecorator {
    regist(): IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator;
}
