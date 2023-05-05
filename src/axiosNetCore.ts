import axios, { AxiosError, AxiosResponse } from "axios";
import { HttpRequestConfig, HttpResponse, RequestCore } from "./ApiClientImpl";

export class DefaultAxiosRequestCoreImpl implements RequestCore {
  onError(e: AxiosError): Promise<HttpResponse<any>> {
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
      headers: e.response?.headers,
      statusCode: e.status,
      errMsg: e.message,
      data: e.response?.data,
    };
  }

  onResponse(res: AxiosResponse<any, any>): HttpResponse<any> {
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
  onRequest(request: HttpRequestConfig): Promise<AxiosResponse<any, any>> {
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

  doRequest(request: HttpRequestConfig): Promise<HttpResponse<any>> {
    return this.onRequest(request)
      .then((res: AxiosResponse<any, any>) => {
        return this.onResponse(res);
      })
      .catch((e: AxiosError) => {
        return this.onError(e);
      });
  }
}
