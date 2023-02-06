import { getNetHubInterpreter } from "./interceptors";
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
                            const l = (interpreters === null || interpreters === void 0 ? void 0 : interpreters.length) || 0;
                            for (let i = 0; i < l; i++) {
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
                        await resolve(undefined, getNetHubInterpreter(constructor.prototype));
                        // 方法注解
                        await resolve("NetHub: 方法 缺少注解 @Method/@GET/@POST...", getNetHubInterpreter(constructor.prototype, p.toString()));
                        // 参数注解
                        if (args.length) {
                            await Promise.all(args.map((val, index) => {
                                return resolve(undefined, getNetHubInterpreter(constructor.prototype, p.toString(), String(index)), val, index);
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
