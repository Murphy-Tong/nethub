import Retro from "..";
import RetroDecorator, { IDecoratorWithValue } from "./decorator";

export default class RetroFieldDecorator<V = any> extends RetroDecorator {
  regist(): IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator {
    const that = this;
    return <IDecoratorWithValue<ParameterDecorator, V> & ParameterDecorator>(
      function (value?: any) {
        if (arguments.length === 3) {
          Retro.addRetroInterpreter(
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
          Retro.addRetroInterpreter(
            that.collectFieldWithValue(
              target,
              propertyKey,
              parameterIndex,
              value
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
