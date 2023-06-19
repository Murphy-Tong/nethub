"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.METHOD = exports.HEAD = exports.DELETE = exports.PUT = exports.POST = exports.GET = exports.GetDecorator = void 0;
const method_1 = require("./define/method");
class GetDecorator extends method_1.NetHubMethodDecorator {
    constructor(method = "GET") {
        super();
        this.method = "GET";
        this.name = "GetDecorator";
        this.method = method;
    }
    collectMethod() {
        return (currentRequestConfig) => {
            currentRequestConfig.method = this.method;
            return currentRequestConfig;
        };
    }
    collectMethodWithValue(value) {
        const that = this;
        return function (currentRequestConfig) {
            if (typeof value === "string") {
                currentRequestConfig.path = value;
                currentRequestConfig.method = that.method;
            }
            else {
                currentRequestConfig.path = value.path || "";
                currentRequestConfig.method = value.method;
            }
            return currentRequestConfig;
        };
    }
}
exports.GetDecorator = GetDecorator;
exports.GET = new GetDecorator("GET").regist();
exports.POST = new GetDecorator("POST").regist();
exports.PUT = new GetDecorator("PUT").regist();
exports.DELETE = new GetDecorator("DELETE").regist();
exports.HEAD = new GetDecorator("HEAD").regist();
exports.METHOD = new GetDecorator("HEAD").regist();
