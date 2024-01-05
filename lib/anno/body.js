import { NetHubFieldDecorator } from "./define/field";
export class BodyDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "BodyDecorator";
    }
    collectField() {
        return function (currentRequestConfig, argumentValue) {
            currentRequestConfig.data = argumentValue;
            return currentRequestConfig;
        };
    }
}
export const Body = new BodyDecorator().regist();
