import { NetHubFieldDecorator } from "./define/field";
export class FieldDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldDecorator";
    }
    collectFieldWithValue(value) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Filed value is null");
        }
        return function (currentRequestConfig, argumentValue) {
            var _a;
            currentRequestConfig.data = (_a = currentRequestConfig.data) !== null && _a !== void 0 ? _a : {};
            if (typeof currentRequestConfig.data !== "object") {
                throw new Error("NetHub: @Field 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.data[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
export class FieldMapMapDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldMapMapDecorator";
    }
    collectField() {
        return function (currentRequestConfig, argumentValue) {
            var _a;
            currentRequestConfig.data = (_a = currentRequestConfig.data) !== null && _a !== void 0 ? _a : {};
            if (typeof currentRequestConfig.data !== "object" || Array.isArray(currentRequestConfig.data)) {
                throw new Error("NetHub: @FieldMap 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.data = Object.assign(currentRequestConfig.data, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
export const Field = new FieldDecorator().regist();
export const FieldMap = new FieldMapMapDecorator().regist();
