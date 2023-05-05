import { NetHubDecorator, IDecoratorWithValue } from "./decorator";
export declare class NetHubMethodDecorator<V = any> extends NetHubDecorator<V> {
    regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
}
