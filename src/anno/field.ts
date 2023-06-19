import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";

export class FieldDecorator extends NetHubFieldDecorator<string> {
  name = "FieldDecorator";

  collectFieldWithValue(value: string): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Filed value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any
    ) {
      currentRequestConfig.data = currentRequestConfig.data ?? {};
      if (typeof currentRequestConfig.data !== "object") {
        throw new Error(
          "NetHub: @Field 当前body已经不是简单对象，无法添加更多参数"
        );
      }
      (currentRequestConfig.data as Record<string, any>)[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class FieldMapMapDecorator extends NetHubFieldDecorator<string> {
  name = "FieldMapMapDecorator";

  collectField(): NetHubInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any
    ) {
      currentRequestConfig.data = currentRequestConfig.data ?? {};
      if (typeof currentRequestConfig.data !== "object") {
        throw new Error(
          "NetHub: @FieldMap 当前body已经不是简单对象，无法添加更多参数"
        );
      }
      currentRequestConfig.data = Object.assign(
        currentRequestConfig.data,
        argumentValue || {}
      );
      return currentRequestConfig;
    };
  }
}

export const Field: IDecoratorWithValue<ParameterDecorator, string> =
  new FieldDecorator().regist();

export const FieldMap: ParameterDecorator = new FieldMapMapDecorator().regist();
