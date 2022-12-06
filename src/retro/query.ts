import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
import RetroFieldDecorator from "./define/field";

export class QueryDecorator extends RetroFieldDecorator<string> {
  name = "QueryDecorator";

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: string
  ): RetroInterpreter {
    if (value === undefined || value === null) {
      throw new Error("Retro: @Query value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      targetServiceConstructor: object,
      methodName: string | Symbol,
      argumentValue?: any
    ) {
      currentRequestConfig.query = currentRequestConfig.query || {};
      currentRequestConfig.query[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class QueryMapDecorator extends RetroFieldDecorator<void> {
  name = "QueryMapDecorator";

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): RetroInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      targetServiceConstructor: object,
      methodName: string | Symbol,
      argumentValue?: any
    ) {
      if (argumentValue && typeof argumentValue !== "object") {
        throw new Error("Retro: @QueryMap 应该用于对象");
      }
      currentRequestConfig.query = Object.assign(
        currentRequestConfig.query || {},
        argumentValue || {}
      );
      return currentRequestConfig;
    };
  }
}

export const Query: IDecoratorWithValue<ParameterDecorator, string> =
  new QueryDecorator().regist();

export const QueryMap: ParameterDecorator = new QueryMapDecorator().regist();
