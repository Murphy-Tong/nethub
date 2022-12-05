import axios, { AxiosError, AxiosResponse } from "axios";
import { RequestCore, HttpRequestConfig, HttpResponse } from "./ApiClientImpl";
import ApiError from "./ApiError";

export default class DefaultRequestCoreImpl implements RequestCore {
  onError(e: AxiosError): Promise<HttpResponse<any>> {
    throw new ApiError(
      e.response?.statusText || e.message,
      e.response?.status,
      {
        headers: e.response?.headers || {},
        statusCode: e.response?.status || ApiError.ERR_CODES.INVALIDATE_CODE,
        errMsg: e.response?.statusText || e.message,
        data: e.response?.data,
      }
    );
  }

  onResponse(res: AxiosResponse<any, any>) {
    return {
      headers: res.headers,
      statusCode: res.status,
      errMsg: res.statusText,
      data: res.data,
    };
  }

  doRequest<T>(request: HttpRequestConfig): Promise<HttpResponse<T>> {
    const {
      url = "",
      method = "GET",
      query,
      field,
      data,
      headers = {},
    } = request;
    return axios
      .request({
        withCredentials: false,
        method,
        url,
        data: field || data,
        params: query,
        headers,
      })
      .then((res: AxiosResponse<any, any>) => {
        return this.onResponse(res);
      })
      .catch((e: AxiosError) => {
        return this.onError(e);
      });
  }
}
