import { addNetHubInterpreter } from "../interceptors";
import NetHubDecorator from "./decorator";
export default class NetHubMethodDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 3) {
                const [target, propertyKey] = arguments;
                addNetHubInterpreter(that.collectMethod(target, propertyKey), target, propertyKey);
                return;
            }
            return function (target, propertyKey) {
                return addNetHubInterpreter(that.collectMethodWithValue(value, target, propertyKey), target, propertyKey);
            };
        };
    }
}
