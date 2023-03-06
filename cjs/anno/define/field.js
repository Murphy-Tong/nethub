"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interceptors_1 = require("../interceptors");
const decorator_1 = __importDefault(require("./decorator"));
class NetHubFieldDecorator extends decorator_1.default {
    regist() {
        const that = this;
        return (function (value) {
            if (arguments.length === 3) {
                (0, interceptors_1.addNetHubInterpreter)(
                // @ts-ignore
                that.collectField.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return (target, propertyKey, parameterIndex) => {
                (0, interceptors_1.addNetHubInterpreter)(that.collectFieldWithValue(value, target, propertyKey, parameterIndex), target, propertyKey, String(parameterIndex));
            };
        });
    }
}
exports.default = NetHubFieldDecorator;
