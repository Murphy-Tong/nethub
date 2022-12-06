import RetroDecorator, { IDecoratorWithValue } from "./decorator";
export default class RetroMethodDecorator<V = any> extends RetroDecorator<V> {
    regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
}
