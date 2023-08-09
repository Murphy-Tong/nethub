import { HttpResponse } from "./ApiClientImpl";
export declare class ApiError extends Error {
    static NOLOGIN: ApiError;
    static ERR_CODES: {
        INVALIDATE_CODE: number;
    };
    code: number | string;
    message: string;
    response: HttpResponse<any> | undefined;
    constructor(msg: string, code?: number | string, response?: HttpResponse<any>);
}
