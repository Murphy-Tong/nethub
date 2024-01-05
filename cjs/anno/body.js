"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Body = exports.BodyDecorator = void 0;
const field_1 = require("./define/field");
class BodyDecorator extends field_1.NetHubFieldDecorator {
    constructor() {
        super(...arguments);
        this.name = "BodyDecorator";
    }
    collectField() {
        return function (currentRequestConfig, argumentValue) {
            currentRequestConfig.data = argumentValue;
            return currentRequestConfig;
        };
    }
}
exports.BodyDecorator = BodyDecorator;
exports.Body = new BodyDecorator().regist();
