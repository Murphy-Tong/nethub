import { addNetHubInterpreter } from "../interceptors";
import { NetHubDecorator, IDecoratorWithValue } from "./decorator";

export class NetHubClassDecorator<V = any> extends NetHubDecorator {
  regist(): ClassDecorator {
    const that = this;
    return <ClassDecorator>function (target: { new (): any }) {
      addNetHubInterpreter(that.collectClass(target), target.prototype);
    };
  }

  registWithValue(): IDecoratorWithValue<ClassDecorator> {
    const that = this;
    return <IDecoratorWithValue<ClassDecorator>>function (value?: V) {
      return (target: { new (): any }) => {
        addNetHubInterpreter(
          that.collectClassWithValue(value, target),
          target.prototype
        );
      };
    };
  }
}
