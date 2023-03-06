"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HOST = exports.HostDecorator = void 0;
const method_1 = __importDefault(require("./define/method"));
class HostDecorator extends method_1.default {
    collectMethodWithValue(value, target, propertyKey) {
        const that = this;
        return function (currentRequestConfig) {
            currentRequestConfig.host = value;
            return currentRequestConfig;
        };
    }
}
exports.HostDecorator = HostDecorator;
exports.HOST = new HostDecorator().regist();
