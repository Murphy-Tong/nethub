"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interceptors_1 = require("../interceptors");
const decorator_1 = __importDefault(require("./decorator"));
class NetHubMethodDecorator extends decorator_1.default {
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 3) {
                const [target, propertyKey] = arguments;
                (0, interceptors_1.addNetHubInterpreter)(that.collectMethod(target, propertyKey), target, propertyKey);
                return;
            }
            return function (target, propertyKey) {
                return (0, interceptors_1.addNetHubInterpreter)(that.collectMethodWithValue(value, target, propertyKey), target, propertyKey);
            };
        };
    }
}
exports.default = NetHubMethodDecorator;
