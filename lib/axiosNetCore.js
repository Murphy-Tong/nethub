import axios from "axios";
import ApiError from "./ApiError";
export default class DefaultAxiosRequestCoreImpl {
    onError(e) {
        var _a, _b, _c, _d, _e, _f;
        throw new ApiError(((_a = e.response) === null || _a === void 0 ? void 0 : _a.statusText) || e.message, (_b = e.response) === null || _b === void 0 ? void 0 : _b.status, {
            headers: ((_c = e.response) === null || _c === void 0 ? void 0 : _c.headers) || {},
            statusCode: ((_d = e.response) === null || _d === void 0 ? void 0 : _d.status) || ApiError.ERR_CODES.INVALIDATE_CODE,
            errMsg: ((_e = e.response) === null || _e === void 0 ? void 0 : _e.statusText) || e.message,
            data: (_f = e.response) === null || _f === void 0 ? void 0 : _f.data,
        });
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
        return axios.request({
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
