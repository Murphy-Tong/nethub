import { NetHubDecorator, IDecoratorWithValue } from "./decorator";
export declare class NetHubClassDecorator<V = any> extends NetHubDecorator {
    regist(): ClassDecorator;
    registWithValue(): IDecoratorWithValue<ClassDecorator>;
}
