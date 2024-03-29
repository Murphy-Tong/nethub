"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiError = void 0;
class ApiError extends Error {
    constructor(msg, code, response) {
        super(msg);
        this.code = 200;
        this.message = "";
        if (code !== undefined && code !== null) {
            this.code = code;
        }
        else {
            this.code = ApiError.ERR_CODES.INVALIDATE_CODE;
        }
        this.message = msg;
        this.response = response;
    }
}
exports.ApiError = ApiError;
ApiError.NOLOGIN = new ApiError("登陆失效", -10001);
ApiError.ERR_CODES = {
    INVALIDATE_CODE: -1,
};
