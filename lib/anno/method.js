import NetHubMethodDecorator from "./define/method";
export class GetDecorator extends NetHubMethodDecorator {
    constructor(method = "GET") {
        super();
        this.method = "GET";
        this.name = "GetDecorator";
        this.method = method;
    }
    collectMethodWithValue(target, propertyKey, value) {
        const that = this;
        return function (currentRequestConfig) {
            if (typeof value === "string") {
                currentRequestConfig.api = value;
                currentRequestConfig.method = that.method;
            }
            else {
                currentRequestConfig.api = value.path;
                currentRequestConfig.method = value.method;
            }
            return currentRequestConfig;
        };
    }
}
export const GET = new GetDecorator("GET").regist();
export const POST = new GetDecorator("POST").regist();
export const PUT = new GetDecorator("PUT").regist();
export const DELETE = new GetDecorator("DELETE").regist();
export const HEAD = new GetDecorator("HEAD").regist();
export const METHOD = new GetDecorator("HEAD").regist();
