import { NetHubMethodDecorator } from "./define/method";
export class HostDecorator extends NetHubMethodDecorator {
    collectMethodWithValue(value, target, propertyKey) {
        const that = this;
        return function (currentRequestConfig) {
            currentRequestConfig.baseURL = value;
            return currentRequestConfig;
        };
    }
}
export const HOST = new HostDecorator().regist();
