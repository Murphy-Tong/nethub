import Retro from ".";
import { HttpRequestConfig } from "../ApiClientImpl";
import RetroDecorator, {
  IDecoratorWithValue,
  RetroInterpreter,
} from "./define/decorator";

export class HeaderDecorator extends RetroDecorator<[string, string] | string> {
  name = "HeaderDecorator";

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: string
  ): RetroInterpreter {
    if (value === undefined || value === null) {
      throw new Error("Retro: @Header value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      targetServiceConstructor: object,
      methodName: string | Symbol,
      argumentValue: any
    ) {
      currentRequestConfig.headers = currentRequestConfig.headers || {};
      if (currentRequestConfig.headers[value]) {
        if (Array.isArray(currentRequestConfig.headers[value])) {
          (currentRequestConfig.headers[value] as Array<string>).push(
            argumentValue
          );
        } else {
          currentRequestConfig.headers[value] = [
            currentRequestConfig.headers[value]?.toString() || "",
            argumentValue,
          ];
        }
      } else {
        currentRequestConfig.headers[value] = argumentValue;
      }
      return currentRequestConfig;
    };
  }
  collectMethodWithValue(
    target: Object,
    propertyKey: string,
    value: [string, string]
  ): RetroInterpreter {
    if (value === undefined || value === null) {
      throw new Error("Retro: @Header value is null");
    }
    return function (currentRequestConfig: HttpRequestConfig) {
      currentRequestConfig.headers = currentRequestConfig.headers || {};
      if (currentRequestConfig.headers[value[0]]) {
        if (Array.isArray(currentRequestConfig.headers[value[0]])) {
          (currentRequestConfig.headers[value[0]] as Array<string>).push(
            value[1]
          );
        } else {
          currentRequestConfig.headers[value[0]] = [
            currentRequestConfig.headers[value[0]]?.toString() || "",
            value[1],
          ];
        }
      } else {
        currentRequestConfig.headers[value[0]] = value[1];
      }
      return currentRequestConfig;
    };
  }

  regist(): IDecoratorWithValue<ParameterDecorator, string> &
    IDecoratorWithValue<MethodDecorator, [string, string]> {
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
      return function (
        target: Object,
        propertyKey: string,
        parameterIndex: number | PropertyDescriptor
      ) {
        if (typeof parameterIndex === "number") {
          return Retro.addRetroInterpreter(
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
        }
        return Retro.addRetroInterpreter(
          that.collectMethodWithValue(target, propertyKey, value),
          target,
          propertyKey
        );
      };
    } as IDecoratorWithValue<ParameterDecorator, string> &
      IDecoratorWithValue<MethodDecorator, [string, string]>;
  }
}

export const Header = new HeaderDecorator().regist() as IDecoratorWithValue<
  MethodDecorator,
  [string, string]
> &
  IDecoratorWithValue<ParameterDecorator, string>;
