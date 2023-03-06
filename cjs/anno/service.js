"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = void 0;
const interceptors_1 = require("./interceptors");
function createServiceProxy(constructor, host) {
    return class {
        constructor(hub) {
            return new Proxy(this, {
                get(target, p, receiver) {
                    return function () {
                        return __awaiter(this, arguments, void 0, function* () {
                            const args = [...arguments];
                            let config = {};
                            if (host) {
                                config.host = host;
                            }
                            const resolve = function (throwMsg, interpreters, val, index) {
                                return __awaiter(this, void 0, void 0, function* () {
                                    if (throwMsg && !(interpreters === null || interpreters === void 0 ? void 0 : interpreters.length)) {
                                        throw new Error(throwMsg);
                                    }
                                    const l = (interpreters === null || interpreters === void 0 ? void 0 : interpreters.length) || 0;
                                    for (let i = 0; i < l; i++) {
                                        const interpreter = interpreters[i];
                                        const res = interpreter(config, val, constructor.prototype, p, index);
                                        if (res instanceof Promise) {
                                            config = yield res;
                                        }
                                        else {
                                            config = res;
                                        }
                                    }
                                });
                            };
                            // 类注解
                            yield resolve(undefined, (0, interceptors_1.getNetHubInterpreter)(constructor.prototype));
                            // 方法注解
                            yield resolve("NetHub: 方法 缺少注解 @Method/@GET/@POST...", (0, interceptors_1.getNetHubInterpreter)(constructor.prototype, p.toString()));
                            // 参数注解
                            if (args.length) {
                                yield Promise.all(args.map((val, index) => {
                                    return resolve(undefined, (0, interceptors_1.getNetHubInterpreter)(constructor.prototype, p.toString(), String(index)), val, index);
                                }));
                            }
                            if (!config.method) {
                                throw new Error(`NetHub: 方法 ${p.toString()} request method 未定义`);
                            }
                            return hub.getClient().execute(config);
                        });
                    };
                },
            });
        }
    };
}
function Service(param) {
    if (typeof param === "string") {
        return function (constructor) {
            return createServiceProxy(constructor, param);
        };
    }
    return createServiceProxy(param);
}
exports.Service = Service;
