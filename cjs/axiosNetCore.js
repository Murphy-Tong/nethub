"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DefaultAxiosRequestCoreImpl = void 0;
const axios_1 = __importDefault(require("axios"));
class DefaultAxiosRequestCoreImpl {
    onError(e) {
        var _a, _b;
        // throw new ApiError(
        //   e.response?.statusText || e.message,
        //   e.response?.status,
        //   {
        //     headers: e.response?.headers || {},
        //     statusCode: e.response?.status || ApiError.ERR_CODES.INVALIDATE_CODE,
        //     errMsg: e.response?.statusText || e.message,
        //     data: e.response?.data,
        //   }
        // );
        return {
            // @ts-ignore
            headers: (_a = e.response) === null || _a === void 0 ? void 0 : _a.headers,
            statusCode: e.status,
            errMsg: e.message,
            data: (_b = e.response) === null || _b === void 0 ? void 0 : _b.data,
        };
    }
    onResponse(res) {
        return {
            headers: res.headers,
            statusCode: res.status,
            errMsg: res.statusText,
            data: res.data,
        };
    }
    /**
     * // `data` 是作为请求体被发送的数据
      // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
      // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - 浏览器专属: FormData, File, Blob
      // - Node 专属: Stream, Buffer
     */
    onRequest(request) {
        const { url = "", method = "GET", query, body, headers = {} } = request;
        return axios_1.default.request({
            withCredentials: false,
            method,
            url,
            data: body,
            params: query,
            headers,
        });
    }
    doRequest(request) {
        return this.onRequest(request)
            .then((res) => {
            return this.onResponse(res);
        })
            .catch((e) => {
            return this.onError(e);
        });
    }
}
exports.DefaultAxiosRequestCoreImpl = DefaultAxiosRequestCoreImpl;
