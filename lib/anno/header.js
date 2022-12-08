import NetHub from ".";
import NetHubDecorator from "./define/decorator";
export class HeaderDecorator extends NetHubDecorator {
    constructor() {
        super(...arguments);
        this.name = "HeaderDecorator";
    }
    collectFieldWithValue(value, target, propertyKey, parameterIndex) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Header value is null");
        }
        return function (currentRequestConfig, argumentValue, targetServiceConstructor, methodName) {
            var _a;
            currentRequestConfig.headers = currentRequestConfig.headers || {};
            if (currentRequestConfig.headers[value]) {
                if (Array.isArray(currentRequestConfig.headers[value])) {
                    currentRequestConfig.headers[value].push(argumentValue);
                }
                else {
                    currentRequestConfig.headers[value] = [
                        ((_a = currentRequestConfig.headers[value]) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        argumentValue,
                    ];
                }
            }
            else {
                currentRequestConfig.headers[value] = argumentValue;
            }
            return currentRequestConfig;
        };
    }
    collectMethodWithValue(value, target, propertyKey) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Header value is null");
        }
        return function (currentRequestConfig) {
            var _a;
            currentRequestConfig.headers = currentRequestConfig.headers || {};
            if (currentRequestConfig.headers[value[0]]) {
                if (Array.isArray(currentRequestConfig.headers[value[0]])) {
                    currentRequestConfig.headers[value[0]].push(value[1]);
                }
                else {
                    currentRequestConfig.headers[value[0]] = [
                        ((_a = currentRequestConfig.headers[value[0]]) === null || _a === void 0 ? void 0 : _a.toString()) || "",
                        value[1],
                    ];
                }
            }
            else {
                currentRequestConfig.headers[value[0]] = value[1];
            }
            return currentRequestConfig;
        };
    }
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 2) {
                NetHub.addNetHubInterpreter(
                // @ts-ignore
                that.collectMethod.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return function (target, propertyKey, parameterIndex) {
                if (typeof parameterIndex === "number") {
                    return NetHub.addNetHubInterpreter(that.collectFieldWithValue(value, target, propertyKey, parameterIndex), target, propertyKey, String(parameterIndex));
                }
                return NetHub.addNetHubInterpreter(that.collectMethodWithValue(value, target, propertyKey), target, propertyKey);
            };
        };
    }
}
export const Header = new HeaderDecorator().regist();
