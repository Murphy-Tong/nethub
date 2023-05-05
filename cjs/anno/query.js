"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.QueryMap = exports.Query = exports.QueryMapDecorator = exports.QueryDecorator = void 0;
const field_1 = require("./define/field");
class QueryDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryDecorator";
    }
    collectFieldWithValue(value, target, propertyKey, parameterIndex) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Query value is null");
        }
        return function (currentRequestConfig, argumentValue, targetServiceConstructor, methodName) {
            currentRequestConfig.query = currentRequestConfig.query || {};
            currentRequestConfig.query[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
exports.QueryDecorator = QueryDecorator;
class QueryMapDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryMapDecorator";
    }
    collectField(target, propertyKey, parameterIndex) {
        return function (currentRequestConfig, argumentValue, targetServiceConstructor, methodName) {
            if (argumentValue && typeof argumentValue !== "object") {
                throw new Error("NetHub: @QueryMap 应该用于对象");
            }
            currentRequestConfig.query = Object.assign(currentRequestConfig.query || {}, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
exports.QueryMapDecorator = QueryMapDecorator;
exports.Query = new QueryDecorator().regist();
exports.QueryMap = new QueryMapDecorator().regist();
