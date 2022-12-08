export function NOOPNetHubInterpreter(currentRequestConfig) {
    return currentRequestConfig;
}
export default class NetHubDecorator {
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
