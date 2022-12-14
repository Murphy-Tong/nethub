import { HttpResponse } from "./ApiClientImpl";
export default class ApiError extends Error {
    static NOLOGIN: ApiError;
    static ERR_CODES: {
        INVALIDATE_CODE: number;
    };
    code: number;
    message: string;
    response: HttpResponse<any> | undefined;
    constructor(msg: string, code?: number, response?: HttpResponse<any>);
}
