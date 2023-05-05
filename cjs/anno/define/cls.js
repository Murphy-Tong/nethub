"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetHubClassDecorator = void 0;
const interceptors_1 = require("../interceptors");
const decorator_1 = require("./decorator");
class NetHubClassDecorator extends decorator_1.NetHubDecorator {
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
exports.NetHubClassDecorator = NetHubClassDecorator;
