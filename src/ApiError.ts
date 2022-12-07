import { HttpResponse } from "./ApiClientImpl";

export default class ApiError extends Error {
  static NOLOGIN = new ApiError("登陆失效", -10001);

  static ERR_CODES = {
    INVALIDATE_CODE: -1,
  };

  code = 200;
  message = "";
  response: HttpResponse<any> | undefined;

  constructor(msg: string, code?: number, response?: HttpResponse<any>) {
    super(msg);
    if (code) {
      this.code = Number(code);
    } else {
      this.code = ApiError.ERR_CODES.INVALIDATE_CODE;
    }
    this.message = msg;
    this.response = response;
  }
}
