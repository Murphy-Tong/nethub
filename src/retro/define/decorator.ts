import { HttpRequestConfig } from "../../ApiClientImpl";

export type IDecoratorWithValue<D, V = string> = (value: V) => D;

export interface RetroInterpreter {
  (
    currentRequestConfig: HttpRequestConfig,
    targetServiceConstructor: object,
    methodName: string | Symbol,
    argumentValue?: any,
    argumentIndex?: number
  ): HttpRequestConfig;
}

export function NOOPRetroInterpreter(currentRequestConfig: HttpRequestConfig) {
  return currentRequestConfig;
}

export default class RetroDecorator<V = any> {
  name = "RetroDecorator";

  collectService(cls: object): RetroInterpreter {
    return NOOPRetroInterpreter;
  }

  collectServiceWithValue(cls: object, value: V): RetroInterpreter {
    return NOOPRetroInterpreter;
  }

  collectMethod(target: Object, propertyKey: string): RetroInterpreter {
    return NOOPRetroInterpreter;
  }

  collectMethodWithValue(
    target: Object,
    propertyKey: string,
    value: V
  ): RetroInterpreter {
    return NOOPRetroInterpreter;
  }

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): RetroInterpreter {
    return NOOPRetroInterpreter;
  }

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: V
  ): RetroInterpreter {
    return NOOPRetroInterpreter;
  }
}
