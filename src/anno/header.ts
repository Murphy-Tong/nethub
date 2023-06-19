import { HttpRequestConfig } from "../ApiClientImpl";
import {
  IDecoratorWithValue,
  NetHubDecorator,
  NetHubInterpreter,
} from "./define/decorator";
import { addNetHubInterpreter } from "./interceptors";

export class HeaderDecorator extends NetHubDecorator<string[] | string> {
  name = "HeaderDecorator";

  collectFieldWithValue(value: string): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Header value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
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

  addHeader(headers: Record<string, any>, key: string, value: string) {
    if (Reflect.has(headers, key)) {
      if (Array.isArray(headers[key])) {
        (headers[key] as Array<string>).push(value);
      } else {
        headers[key] = [headers[key], value];
      }
    } else {
      headers[key] = value;
    }
  }

  collectMethodWithValue(value: string[]): NetHubInterpreter {
    if (value === undefined || value === null || value.length % 2 !== 0) {
      throw new Error("NetHub: @Header value is null or length 不能被2整除");
    }
    return (currentRequestConfig: HttpRequestConfig) => {
      currentRequestConfig.headers = currentRequestConfig.headers || {};
      const val = value;
      for (let index = 0; index < value.length; ) {
        const key = value[index];
        const val = value[index + 1];
        this.addHeader(currentRequestConfig.headers, key, val);
        index += 2;
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
            that.collectFieldWithValue(value),
            target,
            propertyKey,
            String(parameterIndex)
          );
        }
        return addNetHubInterpreter(
          that.collectMethodWithValue(value),
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
