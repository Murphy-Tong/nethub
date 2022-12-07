import NetHubDecorator, { IDecoratorWithValue } from "./decorator";
export default class NetHubMethodDecorator<V = any> extends NetHubDecorator<V> {
    regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
}
