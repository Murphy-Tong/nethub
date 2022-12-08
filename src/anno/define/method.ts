import NetHub from "..";
import NetHubDecorator, { IDecoratorWithValue } from "./decorator";

export default class NetHubMethodDecorator<V = any> extends NetHubDecorator<V> {
  regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator {
    const that = this;
    return function (value?: any) {
      if (arguments.length === 2) {
        NetHub.addNetHubInterpreter(
          // @ts-ignore
          that.collectMethod.apply(that, arguments),
          // @ts-ignore
          ...arguments
        );
        return;
      }
      return function (target: Object, propertyKey: string) {
        return NetHub.addNetHubInterpreter(
          that.collectMethodWithValue(value, target, propertyKey),
          target,
          propertyKey
        );
      };
    } as IDecoratorWithValue<MethodDecorator, V> & MethodDecorator;
  }
}
