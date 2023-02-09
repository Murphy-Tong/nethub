import NetHubMethodDecorator from "./define/method";
export class UrlDecorator extends NetHubMethodDecorator {
    collectMethodWithValue(value, target, propertyKey) {
        const that = this;
        return function (currentRequestConfig) {
            currentRequestConfig.url = value;
            return currentRequestConfig;
        };
    }
}
export const URL = new UrlDecorator().regist();
