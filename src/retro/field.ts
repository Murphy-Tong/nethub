import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, RetroInterpreter } from "./define/decorator";
import RetroFieldDecorator from "./define/field";

export class FieldDecorator extends RetroFieldDecorator<string> {
  name = "FieldDecorator";

  collectFieldWithValue(
    target: Object,
    propertyKey: string,
    parameterIndex: number,
    value: string
  ): RetroInterpreter {
    if (value === undefined || value === null) {
      throw new Error("Retro: @Filed value is null");
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
          "Retro: @Field 当前body已经不是简单对象，无法添加更多参数"
        );
      }
      (currentRequestConfig.body as Record<string, any>)[value] = argumentValue;
      return currentRequestConfig;
    };
  }
}

export class FieldMapMapDecorator extends RetroFieldDecorator<string> {
  name = "FieldMapMapDecorator";

  collectField(
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ): RetroInterpreter {
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
          "Retro: @FieldMap 当前body已经不是简单对象，无法添加更多参数"
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
