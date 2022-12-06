import Retro from "..";
import RetroDecorator, { IDecoratorWithValue } from "./decorator";

export default class RetroMethodDecorator<V = any> extends RetroDecorator<V> {
  regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator {
    const that = this;
    return function (value?: any) {
      if (arguments.length === 2) {
        Retro.addRetroInterpreter(
          // @ts-ignore
          that.collectMethod.apply(that, arguments),
          // @ts-ignore
          ...arguments
        );
        return;
      }
      return function (target: Object, propertyKey: string) {
        return Retro.addRetroInterpreter(
          that.collectMethodWithValue(target, propertyKey, value),
          target,
          propertyKey
        );
      };
    } as IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
  }
}
