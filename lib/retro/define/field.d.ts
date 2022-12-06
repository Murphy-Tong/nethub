import RetroDecorator, { IDecoratorWithValue } from "./decorator";
export default class RetroFieldDecorator<V = any> extends RetroDecorator {
    regist(): IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator;
}
