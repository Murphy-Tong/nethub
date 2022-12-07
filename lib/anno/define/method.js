import NetHub from "..";
import NetHubDecorator from "./decorator";
export default class NetHubMethodDecorator extends NetHubDecorator {
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
            return function (target, propertyKey) {
                return NetHub.addNetHubInterpreter(that.collectMethodWithValue(target, propertyKey, value), target, propertyKey);
            };
        };
    }
}
