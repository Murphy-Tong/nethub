import { HttpRequestConfig } from "../ApiClientImpl";
import NetHubDecorator, {
  IDecoratorWithValue,
  NetHubInterpreter,
} from "./define/decorator";
import { addNetHubInterpreter } from "./interceptors";

export class HeaderDecorator extends NetHubDecorator<
  [string, string] | string
> {
  name = "HeaderDecorator";

  collectFieldWithValue(
    value: string,
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Header value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any,
      targetServiceConstructor: object,
      methodName: string | Symbol
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
    value: [string, string],
    target: Object,
    propertyKey: string
  ): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Header value is null");
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
        addNetHubInterpreter(
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
          return addNetHubInterpreter(
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
        }
        return addNetHubInterpreter(
          that.collectMethodWithValue(value, target, propertyKey),
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
