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
    async launch(request) {
        return this.interceptors[0](request, this.next.bind(this, 1));
    }
}
const DEFAULT_INTERCEPTORS = [
    async function (req, next) {
        const resp = await next(req);
        if (resp.statusCode < 200 || resp.statusCode >= 300) {
            throw new ApiError(resp.errMsg, resp.statusCode, resp);
        }
        return resp;
    },
];
function httpRequestIntercept(requestCore) {
    return async function (request) {
        const config = { ...request };
        return await requestCore.doRequest(config);
    };
}
export class ApiClientImpl {
    constructor(config) {
        this.config = config;
        this.interceptors = config.interceptors || DEFAULT_INTERCEPTORS;
        this.interceptors.push(httpRequestIntercept(config.requestCore));
    }
    async execute(request) {
        var _a, _b;
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
            return (await new Request(this.interceptors).launch(request));
        }
        catch (e) {
            (_b = (_a = this.config).errorHandler) === null || _b === void 0 ? void 0 : _b.call(_a, e);
            if (e instanceof ApiError) {
                return Promise.reject(e);
            }
            return Promise.reject(new ApiError(e.message, undefined, httpResponse));
        }
    }
}
export default function createInstance(config) {
    return new ApiClientImpl(config);
}
