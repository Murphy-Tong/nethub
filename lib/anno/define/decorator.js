export function NOOPNetHubInterpreter(currentRequestConfig) {
    return currentRequestConfig;
}
export default class NetHubDecorator {
    constructor() {
        this.name = "NetHubDecorator";
    }
    collectService(cls) {
        return NOOPNetHubInterpreter;
    }
    collectServiceWithValue(cls, value) {
        return NOOPNetHubInterpreter;
    }
    collectMethod(target, propertyKey) {
        return NOOPNetHubInterpreter;
    }
    collectMethodWithValue(target, propertyKey, value) {
        return NOOPNetHubInterpreter;
    }
    collectField(target, propertyKey, parameterIndex) {
        return NOOPNetHubInterpreter;
    }
    collectFieldWithValue(target, propertyKey, parameterIndex, value) {
        return NOOPNetHubInterpreter;
    }
}
