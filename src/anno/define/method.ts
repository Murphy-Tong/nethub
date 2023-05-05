import { addNetHubInterpreter } from "../interceptors";
import { NetHubDecorator, IDecoratorWithValue } from "./decorator";

export class NetHubMethodDecorator<V = any> extends NetHubDecorator<V> {
  regist(): IDecoratorWithValue<MethodDecorator, V> & MethodDecorator {
    const that = this;
    return function (value?: any) {
      if (arguments.length === 3) {
        const [target, propertyKey] = arguments as any;
        addNetHubInterpreter(
          that.collectMethod(target, propertyKey),
          target,
          propertyKey
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
