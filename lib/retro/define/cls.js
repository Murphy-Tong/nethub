import Retro from "..";
import RetroDecorator from "./decorator";
class RetroClassDecorator extends RetroDecorator {
    regist() {
        const that = this;
        return function (target) {
            Retro.addRetroInterpreter(that.collectService(target), target.prototype);
        };
    }
    registWithValue() {
        const that = this;
        return function (value) {
            return (target) => {
                Retro.addRetroInterpreter(that.collectServiceWithValue(target, value), target.prototype);
            };
        };
    }
}
