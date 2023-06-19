import { NetHubFieldDecorator } from "./define/field";
export class QueryDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryDecorator";
    }
    collectFieldWithValue(value) {
        if (value === undefined || value === null) {
            throw new Error("NetHub: @Query key is null");
        }
        return function (currentRequestConfig, argumentValue) {
            currentRequestConfig.params = currentRequestConfig.params || {};
            currentRequestConfig.params[value] = argumentValue;
            return currentRequestConfig;
        };
    }
}
export class QueryMapDecorator extends NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "QueryMapDecorator";
    }
    collectField() {
        return function (currentRequestConfig, argumentValue) {
            if (argumentValue && typeof argumentValue !== "object") {
                throw new Error("NetHub: @QueryMap 应该用于对象");
            }
            currentRequestConfig.params = Object.assign(currentRequestConfig.params || {}, argumentValue || {});
            return currentRequestConfig;
        };
    }
}
export const Query = new QueryDecorator().regist();
export const QueryMap = new QueryMapDecorator().regist();
