export function NOOPRetroInterpreter(currentRequestConfig) {
    return currentRequestConfig;
}
export default class RetroDecorator {
    constructor() {
        this.name = "RetroDecorator";
    }
    collectService(cls) {
        return NOOPRetroInterpreter;
    }
    collectServiceWithValue(cls, value) {
        return NOOPRetroInterpreter;
    }
    collectMethod(target, propertyKey) {
        return NOOPRetroInterpreter;
    }
    collectMethodWithValue(target, propertyKey, value) {
        return NOOPRetroInterpreter;
    }
    collectField(target, propertyKey, parameterIndex) {
        return NOOPRetroInterpreter;
    }
    collectFieldWithValue(target, propertyKey, parameterIndex, value) {
        return NOOPRetroInterpreter;
    }
}
