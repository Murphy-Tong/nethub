import "reflect-metadata";
import { ApiClient, HttpRequestConfig } from "../ApiClientImpl";
import { NetHubInterpreter } from "./define/decorator";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
export * from "./define";

export interface IService<T> {
  new (): T;
  new (NetHub: NetHub): T;
}

export function Service<T>(constructor: IService<T>) {
  return class {
    constructor(hub: NetHub) {
      return new Proxy(this, {
        get(target, p, receiver) {
          return function () {
            const args = [...arguments];
            let config: HttpRequestConfig = {};
            const resolve = function (
              throwMsg?: string,
              interpreters?: NetHubInterpreter[],
              val?: any,
              index?: number
            ) {
              if (throwMsg && !interpreters?.length) {
                throw new Error(throwMsg);
              }
              interpreters?.forEach((interpreter) => {
                config = interpreter(
                  config,
                  constructor.prototype,
                  p,
                  val,
                  index
                );
              });
            };

            resolve(
              "NetHub: class 缺少注解 @Service",
              NetHub.getNetHubInterpreter(constructor.prototype)
            );
            resolve(
              "NetHub: 方法 缺少注解 @Method/@GET/@POST...",
              NetHub.getNetHubInterpreter(constructor.prototype, p.toString())
            );
            if (args.length) {
              args.forEach((val, index) => {
                resolve(
                  undefined,
                  NetHub.getNetHubInterpreter(
                    constructor.prototype,
                    p.toString(),
                    String(index)
                  ),
                  val,
                  index
                );
              });
            }
            if (!config.method) {
              throw new Error(`NetHub: 方法 ${p.toString()} method 未定义`);
            }
            if (!config.api) {
              throw new Error(`NetHub: 方法 ${p.toString()} path 未定义`);
            }
            return hub.getClient()!.execute(config);
          };
        },
      });
    }
  } as IService<T>;
}

type TreeNode = {
  decorators?: NetHubInterpreter[];
  subTree?: Record<string, TreeNode>;
};

const EMPTY_TREE = {};
const DECORATOR_TREE = new Map<object, TreeNode>();

function addTree(
  interpreter: NetHubInterpreter,
  tree: TreeNode,
  ...path: string[]
) {
  if (!path.length) {
    tree.decorators = tree.decorators || [];
    tree.decorators.push(interpreter);
    return;
  }
  tree.subTree = tree.subTree || {};
  tree.subTree[path[0]] = tree.subTree[path[0]] || {};
  addTree(interpreter, tree.subTree[path[0]], ...path.slice(1));
}

function getTree(
  subTree: TreeNode,
  ...path: string[]
): NetHubInterpreter[] | undefined {
  if (!subTree) {
    return;
  }
  if (!path?.length) {
    return subTree.decorators;
  }
  return getTree(subTree.subTree?.[path[0]] || EMPTY_TREE, ...path.slice(1));
}

export default class NetHub {
  private client: ApiClient | undefined;

  static addNetHubInterpreter(
    interpreter: NetHubInterpreter,
    target: object,
    ...path: string[]
  ) {
    let tree = DECORATOR_TREE.get(target);
    if (!tree) {
      tree = {};
      DECORATOR_TREE.set(target, tree);
    }
    addTree(interpreter, tree, ...path);
  }

  static getNetHubInterpreter(target: object, ...path: string[]) {
    return getTree(DECORATOR_TREE.get(target) || EMPTY_TREE, ...path);
  }

  setClient(client: ApiClient) {
    this.client = client;
    return this;
  }

  getClient() {
    return this.client;
  }

  instance<T>(cls: IService<T>): T {
    return new cls(this);
  }
}
