import { addNetHubInterpreter } from "../interceptors";
import NetHubDecorator, { IDecoratorWithValue } from "./decorator";

export default class NetHubMethodDecorator<V = any> extends NetHubDecorator<V> {
  regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator {
    const that = this;
    return function (value?: any) {
      if (arguments.length === 3) {
        addNetHubInterpreter(
          // @ts-ignore
          that.collectMethod.apply(that, arguments),
          // @ts-ignore
          ...arguments
        );
        return;
      }
      return function (target: Object, propertyKey: string) {
        return addNetHubInterpreter(
          that.collectMethodWithValue(value, target, propertyKey),
          target,
          propertyKey
        );
      };
    } as IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
  }
}
