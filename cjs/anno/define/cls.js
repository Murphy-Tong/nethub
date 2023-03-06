"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interceptors_1 = require("../interceptors");
const decorator_1 = __importDefault(require("./decorator"));
class NetHubClassDecorator extends decorator_1.default {
    regist() {
        const that = this;
        return function (target) {
            (0, interceptors_1.addNetHubInterpreter)(that.collectClass(target), target.prototype);
        };
    }
    registWithValue() {
        const that = this;
        return function (value) {
            return (target) => {
                (0, interceptors_1.addNetHubInterpreter)(that.collectClassWithValue(value, target), target.prototype);
            };
        };
    }
}
exports.default = NetHubClassDecorator;
