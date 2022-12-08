import NetHub from "..";
import NetHubDecorator from "./decorator";
export default class NetHubFieldDecorator extends NetHubDecorator {
    regist() {
        const that = this;
        return (function (value) {
            if (arguments.length === 3) {
                NetHub.addNetHubInterpreter(
                // @ts-ignore
                that.collectField.apply(that, arguments), 
                // @ts-ignore
                ...arguments);
                return;
            }
            return (target, propertyKey, parameterIndex) => {
                NetHub.addNetHubInterpreter(that.collectFieldWithValue(value, target, propertyKey, parameterIndex), target, propertyKey, String(parameterIndex));
            };
        });
    }
}
