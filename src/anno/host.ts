import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import { NetHubMethodDecorator } from "./define/method";

export class HostDecorator extends NetHubMethodDecorator<string> {
  collectMethodWithValue(
    value: string,
    target: Object,
    propertyKey: string
  ): NetHubInterpreter {
    const that = this;
    return function (currentRequestConfig: HttpRequestConfig) {
      currentRequestConfig.host = value;
      return currentRequestConfig;
    };
  }
}

export const HOST: IDecoratorWithValue<MethodDecorator, string> =
  new HostDecorator().regist();
