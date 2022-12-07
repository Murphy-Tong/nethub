import NetHubFieldDecorator from "./define/field";
export class QueryDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryDecorator";
    }
    collectFieldWithValue(target, propertyKey, parameterIndex, value) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Query value is null");
        }
        return function (currentRequestConfig, targetServiceConstructor, methodName, argumentValue) {
            currentRequestConfig.query = currentRequestConfig.query || {};
            currentRequestConfig.query[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
export class QueryMapDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryMapDecorator";
    }
    collectField(target, propertyKey, parameterIndex) {
        return function (currentRequestConfig, targetServiceConstructor, methodName, argumentValue) {
            if (argumentValue && typeof argumentValue !== "object") {
                throw new Error("NetHub: @QueryMap 应该用于对象");
            }
            currentRequestConfig.query = Object.assign(currentRequestConfig.query || {}, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
export const Query = new QueryDecorator().regist();
export const QueryMap = new QueryMapDecorator().regist();
