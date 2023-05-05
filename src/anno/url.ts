import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubMethodDecorator } from "./define/method";

export class UrlDecorator extends NetHubMethodDecorator<string> {
  collectMethodWithValue(
    value: string,
    target: Object,
    propertyKey: string
  ): NetHubInterpreter {
    const that = this;
    return function (currentRequestConfig: HttpRequestConfig) {
      currentRequestConfig.url = value;
      return currentRequestConfig;
    };
  }
}

export const URL: IDecoratorWithValue<MethodDecorator, string> =
  new UrlDecorator().regist();
