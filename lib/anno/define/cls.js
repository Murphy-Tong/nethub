import { addNetHubInterpreter } from "../interceptors";
import NetHubDecorator from "./decorator";
export default class NetHubClassDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return function (target) {
            addNetHubInterpreter(that.collectClass(target), target.prototype);
        };
    }
    registWithValue() {
        const that = this;
        return function (value) {
            return (target) => {
                addNetHubInterpreter(that.collectClassWithValue(value, target), target.prototype);
            };
        };
    }
}
