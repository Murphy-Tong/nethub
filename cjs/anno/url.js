"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.URL = exports.UrlDecorator = void 0;
const method_1 = __importDefault(require("./define/method"));
class UrlDecorator extends method_1.default {
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
