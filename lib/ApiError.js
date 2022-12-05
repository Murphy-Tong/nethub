export default class ApiError {
    constructor(msg, code, response) {
        this.code = 200;
        this.message = '';
        if (code) {
            this.code = Number(code);
        }
        else {
            this.code = ApiError.ERR_CODES.INVALIDATE_CODE;
        }
        this.message = msg;
        this.response = response;
    }
}
ApiError.NOLOGIN = new ApiError('登陆失效', -10001);
ApiError.ERR_CODES = {
    INVALIDATE_CODE: -1,
};
