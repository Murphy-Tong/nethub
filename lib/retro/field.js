import RetroFieldDecorator from "./define/field";
export class FieldDecorator extends RetroFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldDecorator";
    }
    collectFieldWithValue(target, propertyKey, parameterIndex, value) {
        if (value === undefined || value === null) {
            throw new Error("Retro: @Filed value is null");
        }
        return function (currentRequestConfig, targetServiceConstructor, methodName, argumentValue, argumentIndex) {
            currentRequestConfig.body = currentRequestConfig.body || {};
            if (typeof currentRequestConfig.body !== "object") {
                throw new Error("Retro: @Field 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.body[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
export class FieldMapMapDecorator extends RetroFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldMapMapDecorator";
    }
    collectField(target, propertyKey, parameterIndex) {
        return function (currentRequestConfig, targetServiceConstructor, methodName, argumentValue, argumentIndex) {
            currentRequestConfig.body = currentRequestConfig.body || {};
            if (typeof currentRequestConfig.body !== "object") {
                throw new Error("Retro: @FieldMap 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.body = Object.assign(currentRequestConfig.body, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
export const Field = new FieldDecorator().regist();
export const FieldMap = new FieldMapMapDecorator().regist();
