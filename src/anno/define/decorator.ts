import { HttpRequestConfig } from "../../ApiClientImpl";

export type IDecoratorWithValue<D, V = string> = (value: V) => D;

export interface NetHubInterpreter {
  (
    currentRequestConfig: HttpRequestConfig,
    argumentValue: any,
    targetServiceConstructor: object,
    methodName: string | Symbol,
    argumentIndex?: number
  ): HttpRequestConfig;
}

export function NOOPNetHubInterpreter(currentRequestConfig: HttpRequestConfig) {
  return currentRequestConfig;
}

export default class NetHubDecorator<V = any> {
  name = "NetHubDecorator";

  collectClass(cls: object): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectClassWithValue(value: V, cls: object): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectMethod(target: Object, propertyKey: string): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }

  collectMethodWithValue(
    value: V,
    target: Object,
    propertyKey: string
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
    value: V,
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    return NOOPNetHubInterpreter;
  }
}
