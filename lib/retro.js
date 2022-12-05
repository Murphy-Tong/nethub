import "reflect-metadata";
const METHODS = Symbol();
function collectCommon(opt, key, val) {
    let target = opt[key];
    if (!target) {
        target = [];
        // @ts-ignore
        opt[key] = target;
    }
    // @ts-ignore
    target.push(val);
}
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
export function GET(path) {
    return function (target, propertyKey) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.path = path;
        mdOpt.method = "GET";
    };
}
export function POST(path) {
    return function (target, propertyKey) {
        const mdOpt = ensureMethod(target, propertyKey);
        mdOpt.path = path;
        mdOpt.method = "POST";
    };
}
export function Query() {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        if (arguments.length === 2) {
            collectCommon(mdOpt, "commonQuery", [...arguments]);
            return;
        }
        mdOpt.query = mdOpt.query || [];
        mdOpt.query[parameterIndex] = arguments[0];
    };
}
export function Header() {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        if (arguments.length === 2) {
            collectCommon(mdOpt, "commonHeader", [...arguments]);
            return;
        }
        mdOpt.header = mdOpt.header || [];
        mdOpt.header[parameterIndex] = arguments[0];
    };
}
export function Field() {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        if (arguments.length === 2) {
            collectCommon(mdOpt, "commonField", [...arguments]);
            return;
        }
        mdOpt.field = mdOpt.field || [];
        mdOpt.field[parameterIndex] = arguments[0];
    };
}
export function Body() {
    return function (target, propertyKey, parameterIndex) {
        const mdOpt = ensureMethod(target, propertyKey);
        if (arguments.length === 1) {
            mdOpt.commonBody = arguments[0];
            return;
        }
        mdOpt.body = mdOpt.body || [];
        mdOpt.body[parameterIndex] = "body";
    };
}
export function Service() {
    return function (constructor) {
        return class {
            constructor(retro) {
                return new Proxy(this, {
                    get(target, p, receiver) {
                        const opts = ensureMethod(constructor.prototype, p);
                        return function () {
                            var _a, _b, _c;
                            const args = [...arguments];
                            let query = undefined;
                            let field = undefined;
                            let header = undefined;
                            let body = undefined;
                            args.forEach((val, index) => {
                                var _a, _b, _c, _d;
                                let name = (_a = opts.query) === null || _a === void 0 ? void 0 : _a[index];
                                if (name) {
                                    query = query || {};
                                    query[name] = val;
                                }
                                name = (_b = opts.field) === null || _b === void 0 ? void 0 : _b[index];
                                if (name) {
                                    field = field || {};
                                    field[name] = val;
                                }
                                name = (_c = opts.body) === null || _c === void 0 ? void 0 : _c[index];
                                if (name) {
                                    body = val;
                                }
                                name = (_d = opts.header) === null || _d === void 0 ? void 0 : _d[index];
                                if (name) {
                                    header = header || {};
                                    header[name] = val === null || val === void 0 ? void 0 : val.toString();
                                }
                            });
                            (_a = opts.commonHeader) === null || _a === void 0 ? void 0 : _a.forEach(([name, val]) => {
                                var _a, _b, _c;
                                if (!header) {
                                    header = {};
                                }
                                if (header[name]) {
                                    if (Array.isArray(header[name])) {
                                        header[name].push(val === null || val === void 0 ? void 0 : val.toString());
                                    }
                                    else {
                                        header[name] = [
                                            (_b = (_a = header[name]) === null || _a === void 0 ? void 0 : _a.toString()) !== null && _b !== void 0 ? _b : "",
                                            (_c = val === null || val === void 0 ? void 0 : val.toString()) !== null && _c !== void 0 ? _c : "",
                                        ];
                                    }
                                }
                            });
                            (_b = opts.commonField) === null || _b === void 0 ? void 0 : _b.forEach((commonField) => {
                                if (!field) {
                                    field = {};
                                }
                                Object.keys(commonField).forEach((key) => {
                                    if (Reflect.has(field, key)) {
                                        return;
                                    }
                                    field[key] = commonField[key];
                                });
                            });
                            (_c = opts.commonQuery) === null || _c === void 0 ? void 0 : _c.forEach((commonQuery) => {
                                if (!query) {
                                    query = {};
                                }
                                Object.keys(commonQuery).forEach((key) => {
                                    if (Reflect.has(query, key)) {
                                        return;
                                    }
                                    query[key] = commonQuery[key];
                                });
                            });
                            body = body !== null && body !== void 0 ? body : opts.commonBody;
                            return retro.client.execute({
                                api: opts.path,
                                query,
                                body: field || body,
                                method: opts.method,
                                headers: header,
                            });
                        };
                    },
                });
            }
        };
    };
}
export default class Retro {
    constructor(client) {
        this.client = client;
    }
    instance(cls) {
        return new cls(this);
    }
}
