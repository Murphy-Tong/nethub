"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Header = exports.HeaderDecorator = void 0;
const decorator_1 = require("./define/decorator");
const interceptors_1 = require("./interceptors");
class HeaderDecorator extends decorator_1.NetHubDecorator {
    constructor() {
        super(...arguments);
        this.name = "HeaderDecorator";
    }
    collectFieldWithValue(value) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Header value is null");
        }
        return function (currentRequestConfig, argumentValue) {
            var _a;
            currentRequestConfig.headers = currentRequestConfig.headers || {};
            if (currentRequestConfig.headers[value]) {
                if (Array.isArray(currentRequestConfig.headers[value])) {
                    currentRequestConfig.headers[value].push(argumentValue);
                }
                else {
                    currentRequestConfig.headers[value] = [
                        ((_a = currentRequestConfig.headers[value]) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        argumentValue,
                    ];
                }
            }
            else {
                currentRequestConfig.headers[value] = argumentValue;
            }
            return currentRequestConfig;
        };
    }
    addHeader(headers, key, value) {
        if (Reflect.has(headers, key)) {
            if (Array.isArray(headers[key])) {
                headers[key].push(value);
            }
            else {
                headers[key] = [headers[key], value];
            }
        }
        else {
            headers[key] = value;
        }
    }
    collectMethodWithValue(value) {
        if (value === undefined || value === null || value.length % 2 !== 0) {
            throw new Error("NetHub: @Header value is null or length 不能被2整除");
        }
        return (currentRequestConfig) => {
            currentRequestConfig.headers = currentRequestConfig.headers || {};
            const val = value;
            for (let index = 0; index < value.length;) {
                const key = value[index];
                const val = value[index + 1];
                this.addHeader(currentRequestConfig.headers, key, val);
                index += 2;
            }
            return currentRequestConfig;
        };
    }
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 2) {
                (0, interceptors_1.addNetHubInterpreter)(
                // @ts-ignore
                that.collectMethod.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return function (target, propertyKey, parameterIndex) {
                if (typeof parameterIndex === "number") {
                    return (0, interceptors_1.addNetHubInterpreter)(that.collectFieldWithValue(value), target, propertyKey, String(parameterIndex));
                }
                return (0, interceptors_1.addNetHubInterpreter)(that.collectMethodWithValue(value), target, propertyKey);
            };
        };
    }
}
exports.HeaderDecorator = HeaderDecorator;
exports.Header = new HeaderDecorator().regist();
