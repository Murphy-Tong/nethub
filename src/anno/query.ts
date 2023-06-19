import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";

export class QueryDecorator extends NetHubFieldDecorator<string> {
  name = "QueryDecorator";

  collectFieldWithValue(value: string): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Query key is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any
    ) {
      currentRequestConfig.params = currentRequestConfig.params || {};
      currentRequestConfig.params[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class QueryMapDecorator extends NetHubFieldDecorator<void> {
  name = "QueryMapDecorator";

  collectField(): NetHubInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any
    ) {
      if (argumentValue && typeof argumentValue !== "object") {
        throw new Error("NetHub: @QueryMap 应该用于对象");
      }
      currentRequestConfig.params = Object.assign(
        currentRequestConfig.params || {},
        argumentValue || {}
      );
      return currentRequestConfig;
    };
  }
}

export const Query: IDecoratorWithValue<ParameterDecorator, string> =
  new QueryDecorator().regist();

export const QueryMap: ParameterDecorator = new QueryMapDecorator().regist();
