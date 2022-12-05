"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Service = exports.Field = exports.Query = exports.POST = exports.GET = void 0;
require("reflect-metadata");
const METHODS = Symbol();
function ensureMethod(target, name) {
    let mds = Reflect.getMetadata(METHODS, target);
    if (mds === null || mds === void 0 ? void 0 : mds[name]) {
        return mds[name];
    }
    if (!mds) {
        mds = {};
        Reflect.defineMetadata(METHODS, mds, target);
    }
    if (!mds[name]) {
        mds[name] = {};
    }
    return mds[name];
}
function GET(path) {
    return function (target, propertyKey) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.path = path;
        mdOpt.method = "GET";
    };
}
exports.GET = GET;
function POST(path) {
    return function (target, propertyKey) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.path = path;
        mdOpt.method = "POST";
    };
}
exports.POST = POST;
function Query(name) {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.query = mdOpt.query || [];
        mdOpt.query[parameterIndex] = name;
    };
}
exports.Query = Query;
function Field(name) {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.field = mdOpt.field || [];
        mdOpt.field[parameterIndex] = name;
    };
}
exports.Field = Field;
function Service() {
    return function (constructor) {
        return class {
            constructor(retro) {
                return new Proxy(this, {
                    get(target, p, receiver) {
                        const opts = ensureMethod(constructor.prototype, p);
                        return function () {
                            const args = [...arguments];
                            const query = {};
                            const field = {};
                            const headers = {};
                            const body = [];
                            args.forEach((val, index) => {
                                let name = opts.query[index];
                                if (name) {
                                    query[name] = val;
                                }
                                name = opts.field[index];
                                if (name) {
                                    field[name] = val;
                                }
                                name = opts.body[index];
                                if (name) {
                                    body.push(val);
                                }
                            });
                            return retro.client.execute({
                                api: opts.path,
                                query: query,
                                field: field,
                                data: body,
                                method: opts.method,
                                headers,
                            });
                        };
                    },
                });
            }
        };
    };
}
exports.Service = Service;
class Retro {
    constructor(client) {
        this.client = client;
    }
    instance(cls) {
        return new cls(this);
    }
}
exports.default = Retro;
