import NetHub from "..";
import NetHubDecorator, { IDecoratorWithValue } from "./decorator";

class NetHubClassDecorator<V = any> extends NetHubDecorator {
  regist(): ClassDecorator {
    const that = this;
    return <ClassDecorator>function (target: { new (): any }) {
      NetHub.addNetHubInterpreter(that.collectService(target), target.prototype);
    };
  }

  registWithValue(): IDecoratorWithValue<ClassDecorator> {
    const that = this;
    return <IDecoratorWithValue<ClassDecorator>>function (value?: V) {
      return (target: { new (): any }) => {
        NetHub.addNetHubInterpreter(
          that.collectServiceWithValue(target, value),
          target.prototype
        );
      };
    };
  }
}
