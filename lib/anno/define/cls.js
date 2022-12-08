import NetHub from "..";
import NetHubDecorator from "./decorator";
export default class NetHubClassDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return function (target) {
            NetHub.addNetHubInterpreter(that.collectClass(target), target.prototype);
        };
    }
    registWithValue() {
        const that = this;
        return function (value) {
            return (target) => {
                NetHub.addNetHubInterpreter(that.collectClassWithValue(value, target), target.prototype);
            };
        };
    }
}
