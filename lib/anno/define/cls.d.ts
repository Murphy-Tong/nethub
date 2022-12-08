import NetHubDecorator, { IDecoratorWithValue } from "./decorator";
export default class NetHubClassDecorator<V = any> extends NetHubDecorator {
    regist(): ClassDecorator;
    registWithValue(): IDecoratorWithValue<ClassDecorator>;
}
