import { AxiosError, AxiosResponse } from "axios";
import { RequestCore, HttpRequestConfig, HttpResponse } from "./ApiClientImpl";
export default class DefaultAxiosRequestCoreImpl implements RequestCore {
    onError(e: AxiosError): Promise<HttpResponse<any>>;
    onResponse(res: AxiosResponse<any, any>): HttpResponse<any>;
    /**
     * // `data` 是作为请求体被发送的数据
      // 仅适用 'PUT', 'POST', 'DELETE 和 'PATCH' 请求方法
      // 在没有设置 `transformRequest` 时，则必须是以下类型之一:
      // - string, plain object, ArrayBuffer, ArrayBufferView, URLSearchParams
      // - 浏览器专属: FormData, File, Blob
      // - Node 专属: Stream, Buffer
     */
    onRequest(request: HttpRequestConfig): Promise<AxiosResponse<any, any>>;
    doRequest(request: HttpRequestConfig): Promise<HttpResponse<any>>;
}
