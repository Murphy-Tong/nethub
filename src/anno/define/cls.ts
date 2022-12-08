import NetHub from "..";
import NetHubDecorator, { IDecoratorWithValue } from "./decorator";

export default class NetHubClassDecorator<V = any> extends NetHubDecorator {
  regist(): ClassDecorator {
    const that = this;
    return <ClassDecorator>function (target: { new (): any }) {
      NetHub.addNetHubInterpreter(that.collectClass(target), target.prototype);
    };
  }

  registWithValue(): IDecoratorWithValue<ClassDecorator> {
    const that = this;
    return <IDecoratorWithValue<ClassDecorator>>function (value?: V) {
      return (target: { new (): any }) => {
        NetHub.addNetHubInterpreter(
          that.collectClassWithValue(value, target),
          target.prototype
        );
      };
    };
  }
}
