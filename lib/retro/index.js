import "reflect-metadata";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
export * from "./define";
export function Service(constructor) {
    return class {
        constructor(retro) {
            return new Proxy(this, {
                get(target, p, receiver) {
                    return function () {
                        const args = [...arguments];
                        let config = {};
                        const resolve = function (throwMsg, interpreters, val, index) {
                            interpreters === null || interpreters === void 0 ? void 0 : interpreters.forEach((interpreter) => {
                                config = interpreter(config, constructor.prototype, p, val, index);
                            });
                        };
                        resolve("class 缺少注解 @Service", Retro.getRetroInterpreter(constructor.prototype));
                        resolve("方法 缺少注解 @Method/@GET/@POST...", Retro.getRetroInterpreter(constructor.prototype, p.toString()));
                        if (args.length) {
                            args.forEach((val, index) => {
                                resolve(undefined, Retro.getRetroInterpreter(constructor.prototype, p.toString(), String(index)), val, index);
                            });
                        }
                        if (!config.method) {
                            throw new Error(`Retro: 方法 ${p.toString()} method 未定义`);
                        }
                        if (!config.api) {
                            throw new Error(`Retro: 方法 ${p.toString()} path 未定义`);
                        }
                        return retro.client.execute(config);
                    };
                },
            });
        }
    };
}
const EMPTY_TREE = {};
const DECORATOR_TREE = new Map();
function addTree(interpreter, tree, ...path) {
    if (!path.length) {
        tree.decorators = tree.decorators || [];
        tree.decorators.push(interpreter);
        return;
    }
    tree.subTree = tree.subTree || {};
    tree.subTree[path[0]] = tree.subTree[path[0]] || {};
    addTree(interpreter, tree.subTree[path[0]], ...path.slice(1));
}
function getTree(subTree, ...path) {
    var _a;
    if (!subTree) {
        return;
    }
    if (!(path === null || path === void 0 ? void 0 : path.length)) {
        return subTree.decorators;
    }
    return getTree(((_a = subTree.subTree) === null || _a === void 0 ? void 0 : _a[path[0]]) || EMPTY_TREE, ...path.slice(1));
}
export default class Retro {
    static addRetroInterpreter(interpreter, target, ...path) {
        let tree = DECORATOR_TREE.get(target);
        if (!tree) {
            tree = {};
            DECORATOR_TREE.set(target, tree);
        }
        addTree(interpreter, tree, ...path);
    }
    static getRetroInterpreter(target, ...path) {
        return getTree(DECORATOR_TREE.get(target) || EMPTY_TREE, ...path);
    }
    setClient(client) {
        this.client = client;
    }
    instance(cls) {
        return new cls(this);
    }
}
