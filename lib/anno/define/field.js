import { addNetHubInterpreter } from "../interceptors";
import NetHubDecorator from "./decorator";
export default class NetHubFieldDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return (function (value) {
            if (arguments.length === 3) {
                addNetHubInterpreter(
                // @ts-ignore
                that.collectField.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return (target, propertyKey, parameterIndex) => {
                addNetHubInterpreter(that.collectFieldWithValue(value, target, propertyKey, parameterIndex), target, propertyKey, String(parameterIndex));
            };
        });
    }
}
