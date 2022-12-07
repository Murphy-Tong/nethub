import { HttpRequestConfig } from "../../ApiClientImpl";

export type IDecoratorWithValue<D, V = string> = (value: V) => D;

export interface NetHubInterpreter {
  (
    currentRequestConfig: HttpRequestConfig,
    targetServiceConstructor: object,
    methodName: string | Symbol,
    argumentValue?: any,
    argumentIndex?: number
  ): HttpRequestConfig;
}

export function NOOPNetHubInterpreter(currentRequestConfig: HttpRequestConfig) {
  return currentRequestConfig;
}

export default class NetHubDecorator<V = any> {
  name = "NetHubDecorator";

  collectService(cls: object): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectServiceWithValue(cls: object, value: V): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectMethod(target: Object, propertyKey: string): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectMethodWithValue(
    target: Object,
    propertyKey: string,
    value: V
  ): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: V
  ): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }
}
