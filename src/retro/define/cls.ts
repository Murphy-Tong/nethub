import Retro from "..";
import RetroDecorator, { IDecoratorWithValue } from "./decorator";

class RetroClassDecorator<V = any> extends RetroDecorator {
  regist(): ClassDecorator {
    const that = this;
    return <ClassDecorator>function (target: { new (): any }) {
      Retro.addRetroInterpreter(that.collectService(target), target.prototype);
    };
  }

  registWithValue(): IDecoratorWithValue<ClassDecorator> {
    const that = this;
    return <IDecoratorWithValue<ClassDecorator>>function (value?: V) {
      return (target: { new (): any }) => {
        Retro.addRetroInterpreter(
          that.collectServiceWithValue(target, value),
          target.prototype
        );
      };
    };
  }
}
