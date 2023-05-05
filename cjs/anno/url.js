"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.UrlDecorator = void 0;
const method_1 = require("./define/method");
class UrlDecorator extends method_1.NetHubMethodDecorator {
    collectMethodWithValue(value, target, propertyKey) {
        const that = this;
        return function (currentRequestConfig) {
            currentRequestConfig.url = value;
            return currentRequestConfig;
        };
    }
}
exports.UrlDecorator = UrlDecorator;
exports.URL = new UrlDecorator().regist();
