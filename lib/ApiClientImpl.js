var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import ApiError from "./ApiError";
class Request {
    constructor(interceptors) {
        this.interceptors = interceptors;
    }
    next(nextIndex, req) {
        const intercept = this.interceptors[nextIndex];
        return intercept(req, (nextIndex >= this.interceptors.length
            ? null
            : this.next.bind(this, nextIndex + 1)));
    }
    launch(request) {
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
                throw new ApiError(resp.errMsg, resp.statusCode, resp);
            }
            return resp;
        });
    },
];
function httpRequestIntercept(requestCore) {
    return function (request) {
        return __awaiter(this, void 0, void 0, function* () {
            const config = Object.assign({}, request);
            return yield requestCore.doRequest(config);
        });
    };
}
export class ApiClientImpl {
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
                    if (request.host) {
                        request.url = request.host + request.path;
                    }
                    else if (this.config.host) {
                        request.url = this.config.host + request.path;
                    }
                    else {
                        request.url = request.path;
                    }
                }
                return (yield new Request(this.interceptors).launch(request));
            }
            catch (e) {
                (_b = (_a = this.config).errorHandler) === null || _b === void 0 ? void 0 : _b.call(_a, e);
                if (e instanceof ApiError) {
                    return Promise.reject(e);
                }
                return Promise.reject(new ApiError(e.message, undefined, httpResponse));
            }
        });
    }
}
export default function createInstance(config) {
    return new ApiClientImpl(config);
}
