"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FieldMap = exports.Field = exports.FieldMapMapDecorator = exports.FieldDecorator = void 0;
const field_1 = require("./define/field");
class FieldDecorator extends field_1.NetHubFieldDecorator {
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
exports.FieldDecorator = FieldDecorator;
class FieldMapMapDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "FieldMapMapDecorator";
    }
    collectField() {
        return function (currentRequestConfig, argumentValue) {
            var _a;
            currentRequestConfig.data = (_a = currentRequestConfig.data) !== null && _a !== void 0 ? _a : {};
            if (typeof currentRequestConfig.data !== "object") {
                throw new Error("NetHub: @FieldMap 当前body已经不是简单对象，无法添加更多参数");
            }
            currentRequestConfig.data = Object.assign(currentRequestConfig.data, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
exports.FieldMapMapDecorator = FieldMapMapDecorator;
exports.Field = new FieldDecorator().regist();
exports.FieldMap = new FieldMapMapDecorator().regist();
