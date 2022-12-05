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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiClientImpl = void 0;
const ApiError_1 = __importDefault(require("./ApiError"));
class Request {
    constructor(interceptors) {
        this.interceptors = interceptors;
    }
    next(index, req) {
        const intercept = this.interceptors[index];
        return intercept(req, (index >= this.interceptors.length
            ? null
            : this.next.bind(this, index + 1)));
    }
    execute(request) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.interceptors[0](request, this.next.bind(this, 1));
        });
    }
}
const DEFAULT_INTERCEPTORS = [
    function (req, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield next(req);
            if (resp.statusCode < 200 || resp.statusCode >= 300) {
                throw new ApiError_1.default(resp.errMsg, resp.statusCode, resp);
            }
            return resp;
        });
    },
];
function httpRequestIntercept(requestCore) {
    return function (request) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign({}, request);
            delete config.clientConfig;
            return yield requestCore.doRequest(config);
        });
    };
}
class ApiClientImpl {
    constructor(config) {
        this.config = config;
        this.interceptors = config.interceptors || DEFAULT_INTERCEPTORS;
        this.interceptors.push(httpRequestIntercept(config.requestCore));
    }
    execute(request) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            let httpResponse;
            try {
                if (!request.url) {
                    if (this.config.baseUrl) {
                        request.url = this.config.baseUrl + request.api;
                    }
                    else {
                        request.url = request.api;
                    }
                }
                return (yield new Request(this.interceptors).execute(request));
            }
            catch (e) {
                (_b = (_a = this.config).errorHandler) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                if (e instanceof ApiError_1.default) {
                    return Promise.reject(e);
                }
                return Promise.reject(new ApiError_1.default(e.message, undefined, httpResponse));
            }
        });
    }
}
exports.ApiClientImpl = ApiClientImpl;
function createInstance(config) {
    return new ApiClientImpl(config);
}
exports.default = createInstance;
