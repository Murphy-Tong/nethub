"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldMap = exports.Field = exports.FieldMapMapDecorator = exports.FieldDecorator = void 0;
const field_1 = require("./define/field");
class FieldDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldDecorator";
    }
    collectFieldWithValue(value, target, propertyKey, parameterIndex) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Filed value is null");
        }
        return function (currentRequestConfig, argumentValue, targetServiceConstructor, methodName, argumentIndex) {
            currentRequestConfig.body = currentRequestConfig.body || {};
            if (typeof currentRequestConfig.body !== "object") {
                throw new Error("NetHub: @Field 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.body[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
exports.FieldDecorator = FieldDecorator;
class FieldMapMapDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldMapMapDecorator";
    }
    collectField(target, propertyKey, parameterIndex) {
        return function (currentRequestConfig, argumentValue, targetServiceConstructor, methodName, argumentIndex) {
            currentRequestConfig.body = currentRequestConfig.body || {};
            if (typeof currentRequestConfig.body !== "object") {
                throw new Error("NetHub: @FieldMap 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.body = Object.assign(currentRequestConfig.body, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
exports.FieldMapMapDecorator = FieldMapMapDecorator;
exports.Field = new FieldDecorator().regist();
exports.FieldMap = new FieldMapMapDecorator().regist();
