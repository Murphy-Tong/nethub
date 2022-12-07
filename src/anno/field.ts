import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubFieldDecorator from "./define/field";

export class FieldDecorator extends NetHubFieldDecorator<string> {
  name = "FieldDecorator";

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: string
  ): NetHubInterpreter {
    if (value === undefined || value === null) {
      throw new Error("NetHub: @Filed value is null");
    }
    return function (
      currentRequestConfig: HttpRequestConfig,
      targetServiceConstructor: object,
      methodName: string | Symbol,
      argumentValue?: any,
      argumentIndex?: number
    ) {
      currentRequestConfig.body = currentRequestConfig.body || {};
      if (typeof currentRequestConfig.body !== "object") {
        throw new Error(
          "NetHub: @Field 当前body已经不是简单对象，无法添加更多参数"
        );
      }
      (currentRequestConfig.body as Record<string, any>)[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class FieldMapMapDecorator extends NetHubFieldDecorator<string> {
  name = "FieldMapMapDecorator";

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): NetHubInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      targetServiceConstructor: object,
      methodName: string | Symbol,
      argumentValue?: any,
      argumentIndex?: number
    ) {
      currentRequestConfig.body = currentRequestConfig.body || {};
      if (typeof currentRequestConfig.body !== "object") {
        throw new Error(
          "NetHub: @FieldMap 当前body已经不是简单对象，无法添加更多参数"
        );
      }
      currentRequestConfig.body = Object.assign(
        currentRequestConfig.body,
        argumentValue || {}
      );
      return currentRequestConfig;
    };
  }
}

export const Field: IDecoratorWithValue<ParameterDecorator, string> =
  new FieldDecorator().regist();

export const FieldMap: ParameterDecorator = new FieldMapMapDecorator().regist();
