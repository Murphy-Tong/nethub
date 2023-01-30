import { addNetHubInterpreter } from "../interceptors";
import NetHubDecorator from "./decorator";
export default class NetHubMethodDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 2) {
                addNetHubInterpreter(
                // @ts-ignore
                that.collectMethod.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return function (target, propertyKey) {
                return addNetHubInterpreter(that.collectMethodWithValue(value, target, propertyKey), target, propertyKey);
            };
        };
    }
}
