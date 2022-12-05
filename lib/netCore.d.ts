import { AxiosError, AxiosResponse } from "axios";
import { RequestCore, HttpRequestConfig, HttpResponse } from "./ApiClientImpl";
export default class DefaultRequestCoreImpl implements RequestCore {
    onError(e: AxiosError): Promise<HttpResponse<any>>;
    onResponse(res: AxiosResponse<any, any>): {
        headers: import("axios").AxiosResponseHeaders | Partial<Record<string, string> & {
            "set-cookie"?: string[] | undefined;
        }>;
        statusCode: number;
        errMsg: string;
        data: any;
    };
    doRequest<T>(request: HttpRequestConfig): Promise<HttpResponse<T>>;
}
