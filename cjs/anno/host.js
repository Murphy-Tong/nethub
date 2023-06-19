"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST = exports.HostDecorator = void 0;
const method_1 = require("./define/method");
class HostDecorator extends method_1.NetHubMethodDecorator {
    collectMethodWithValue(value, target, propertyKey) {
        const that = this;
        return function (currentRequestConfig) {
            currentRequestConfig.baseURL = value;
            return currentRequestConfig;
        };
    }
}
exports.HostDecorator = HostDecorator;
exports.HOST = new HostDecorator().regist();
