import "reflect-metadata";
export * from "./define";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";
function createServiceProxy(constructor, host) {
    return class {
        constructor(hub) {
            return new Proxy(this, {
                get(target, p, receiver) {
                    return async function () {
                        const args = [...arguments];
                        let config = {};
                        if (host) {
                            config.baseUrl = host;
                        }
                        const resolve = async function (throwMsg, interpreters, val, index) {
                            if (throwMsg && !(interpreters === null || interpreters === void 0 ? void 0 : interpreters.length)) {
                                throw new Error(throwMsg);
                            }
                            for (let i = 0; i < interpreters.length; i++) {
                                const interpreter = interpreters[i];
                                const res = interpreter(config, val, constructor.prototype, p, index);
                                if (res instanceof Promise) {
                                    config = await res;
                                }
                                else {
                                    config = res;
                                }
                            }
                        };
                        // 类注解
                        await resolve(undefined, NetHub.getNetHubInterpreter(constructor.prototype));
                        // 方法注解
                        resolve("NetHub: 方法 缺少注解 @Method/@GET/@POST...", NetHub.getNetHubInterpreter(constructor.prototype, p.toString()));
                        // 参数注解
                        if (args.length) {
                            await Promise.all(args.map((val, index) => {
                                return resolve(undefined, NetHub.getNetHubInterpreter(constructor.prototype, p.toString(), String(index)), val, index);
                            }));
                        }
                        if (!config.method) {
                            throw new Error(`NetHub: 方法 ${p.toString()} request method 未定义`);
                        }
                        return hub.getClient().execute(config);
                    };
                },
            });
        }
    };
}
export function Service(param) {
    if (typeof param === "string") {
        return function (constructor) {
            return createServiceProxy(constructor, param);
        };
    }
    return createServiceProxy(param);
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
export default class NetHub {
    static addNetHubInterpreter(interpreter, target, ...path) {
        let tree = DECORATOR_TREE.get(target);
        if (!tree) {
            tree = {};
            DECORATOR_TREE.set(target, tree);
        }
        addTree(interpreter, tree, ...path);
    }
    static getNetHubInterpreter(target, ...path) {
        return getTree(DECORATOR_TREE.get(target) || EMPTY_TREE, ...path);
    }
    setClient(client) {
        this.client = client;
        return this;
    }
    getClient() {
        return this.client;
    }
    create(cls) {
        return new cls(this);
    }
}
