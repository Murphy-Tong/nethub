import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";

export class QueryDecorator extends NetHubFieldDecorator<string> {
  name = "QueryDecorator";

  collectFieldWithValue(
    value: string,
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Query value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any,
      targetServiceConstructor: object,
      methodName: string | Symbol
    ) {
      currentRequestConfig.query = currentRequestConfig.query || {};
      currentRequestConfig.query[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class QueryMapDecorator extends NetHubFieldDecorator<void> {
  name = "QueryMapDecorator";

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any,
      targetServiceConstructor: object,
      methodName: string | Symbol
    ) {
      if (argumentValue && typeof argumentValue !== "object") {
        throw new Error("NetHub: @QueryMap 应该用于对象");
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
