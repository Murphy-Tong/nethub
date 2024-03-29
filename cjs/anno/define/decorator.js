"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetHubDecorator = exports.NOOPNetHubInterpreter = void 0;
function NOOPNetHubInterpreter(currentRequestConfig) {
    return currentRequestConfig;
}
exports.NOOPNetHubInterpreter = NOOPNetHubInterpreter;
class NetHubDecorator {
    constructor() {
        this.name = "NetHubDecorator";
    }
    collectClass(cls) {
        return NOOPNetHubInterpreter;
    }
    collectClassWithValue(value, cls) {
        return NOOPNetHubInterpreter;
    }
    collectMethod(target, propertyKey) {
        return NOOPNetHubInterpreter;
    }
    collectMethodWithValue(value, target, propertyKey) {
        return NOOPNetHubInterpreter;
    }
    collectField(target, propertyKey, parameterIndex) {
        return NOOPNetHubInterpreter;
    }
    collectFieldWithValue(value, target, propertyKey, parameterIndex) {
        return NOOPNetHubInterpreter;
    }
}
exports.NetHubDecorator = NetHubDecorator;
