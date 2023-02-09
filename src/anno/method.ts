import { HttpRequestConfig } from "../ApiClientImpl";
import { IDecoratorWithValue, NetHubInterpreter } from "./define/decorator";
import NetHubMethodDecorator from "./define/method";

export class GetDecorator extends NetHubMethodDecorator<
  string | { path: string; method: string }
> {
  method = "GET";
  name = "GetDecorator";

  constructor(method = "GET") {
    super();
    this.method = method;
  }

  collectMethodWithValue(
    value: string | { path: string; method: string },
    target: Object,
    propertyKey: string
  ): NetHubInterpreter {
    const that = this;
    return function (currentRequestConfig: HttpRequestConfig) {
      if (typeof value === "string") {
        currentRequestConfig.path = value;
        currentRequestConfig.method = that.method;
      } else {
        currentRequestConfig.path = value.path;
        currentRequestConfig.method = value.method;
      }
      return currentRequestConfig;
    };
  }
}

export const GET: IDecoratorWithValue<MethodDecorator, string> =
  new GetDecorator("GET").regist();

export const POST: IDecoratorWithValue<MethodDecorator, string> =
  new GetDecorator("POST").regist();

export const PUT: IDecoratorWithValue<MethodDecorator, string> =
  new GetDecorator("PUT").regist();

export const DELETE: IDecoratorWithValue<MethodDecorator, string> =
  new GetDecorator("DELETE").regist();

export const HEAD: IDecoratorWithValue<MethodDecorator, string> =
  new GetDecorator("HEAD").regist();

export const METHOD: IDecoratorWithValue<
  MethodDecorator,
  string | { path: string; method: string }
> = new GetDecorator("HEAD").regist();
