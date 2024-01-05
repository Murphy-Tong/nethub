import { HttpRequestConfig } from "../ApiClientImpl";
import { NetHubInterpreter } from "./define/decorator";
import { NetHubFieldDecorator } from "./define/field";


export class BodyDecorator extends NetHubFieldDecorator<string> {
  name = "BodyDecorator";

  collectField(): NetHubInterpreter {
    return function (
      currentRequestConfig: HttpRequestConfig,
      argumentValue: any
    ) {
      currentRequestConfig.data = argumentValue;
      return currentRequestConfig;
    };
  }
}


export const Body: ParameterDecorator = new BodyDecorator().regist();
