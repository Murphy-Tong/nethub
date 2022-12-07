import NetHub from "..";
import NetHubDecorator from "./decorator";
class NetHubClassDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return function (target) {
            NetHub.addNetHubInterpreter(that.collectService(target), target.prototype);
        };
    }
    registWithValue() {
        const that = this;
        return function (value) {
            return (target) => {
                NetHub.addNetHubInterpreter(that.collectServiceWithValue(target, value), target.prototype);
            };
        };
    }
}
