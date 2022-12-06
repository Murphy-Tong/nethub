import Retro from "..";
import RetroDecorator from "./decorator";
export default class RetroFieldDecorator extends RetroDecorator {
    regist() {
        const that = this;
        return (function (value) {
            if (arguments.length === 3) {
                Retro.addRetroInterpreter(
                // @ts-ignore
                that.collectField.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return (target, propertyKey, parameterIndex) => {
                Retro.addRetroInterpreter(that.collectFieldWithValue(target, propertyKey, parameterIndex, value), target, propertyKey, String(parameterIndex));
            };
        });
    }
}
