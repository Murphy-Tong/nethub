import NetHub from "..";
import NetHubDecorator, { IDecoratorWithValue } from "./decorator";

export default class NetHubFieldDecorator<V = any> extends NetHubDecorator {
  regist(): IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator {
    const that = this;
    return <IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator>(
      function (value?: any) {
        if (arguments.length === 3) {
          NetHub.addNetHubInterpreter(
            // @ts-ignore
            that.collectField.apply(that, arguments),
            // @ts-ignore
            ...arguments
          );
          return;
        }
        return (
          target: Object,
          propertyKey: string,
          parameterIndex: number
        ) => {
          NetHub.addNetHubInterpreter(
            that.collectFieldWithValue(
              value,
              target,
              propertyKey,
              parameterIndex
            ),
            target,
            propertyKey,
            String(parameterIndex)
          );
        };
      }
    );
  }
}
