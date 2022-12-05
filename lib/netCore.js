"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
const ApiError_1 = __importDefault(require("./ApiError"));
class DefaultRequestCoreImpl {
    onError(e) {
        var _a, _b, _c, _d, _e, _f;
        throw new ApiError_1.default(((_a = e.response) === null || _a === void 0 ? void 0 : _a.statusText) || e.message, (_b = e.response) === null || _b === void 0 ? void 0 : _b.status, {
            headers: ((_c = e.response) === null || _c === void 0 ? void 0 : _c.headers) || {},
            statusCode: ((_d = e.response) === null || _d === void 0 ? void 0 : _d.status) || ApiError_1.default.ERR_CODES.INVALIDATE_CODE,
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
    doRequest(request) {
        const { url = "", method = "GET", query, field, data, headers = {}, } = request;
        return axios_1.default
            .request({
            withCredentials: false,
            method,
            url,
            data: field || data,
            params: query,
            headers,
        })
            .then((res) => {
            return this.onResponse(res);
        })
            .catch((e) => {
            return this.onError(e);
        });
    }
}
exports.default = DefaultRequestCoreImpl;
