import Retro from "..";
import RetroDecorator from "./decorator";
export default class RetroMethodDecorator extends RetroDecorator {
    regist() {
        const that = this;
        return function (value) {
            if (arguments.length === 2) {
                Retro.addRetroInterpreter(
                // @ts-ignore
                that.collectMethod.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return function (target, propertyKey) {
                return Retro.addRetroInterpreter(that.collectMethodWithValue(target, propertyKey, value), target, propertyKey);
            };
        };
    }
}
