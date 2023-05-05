"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetHubMethodDecorator = void 0;
const interceptors_1 = require("../interceptors");
const decorator_1 = require("./decorator");
class NetHubMethodDecorator extends decorator_1.NetHubDecorator {
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
exports.NetHubMethodDecorator = NetHubMethodDecorator;
