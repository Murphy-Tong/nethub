import type { Stream } from "stream";
import ApiError from "./ApiError";

export type Iterial = undefined | string | number | boolean;
export interface IRequestQuery {
  [key: string]: Iterial | Iterial[] | IRequestQuery;
}

export type IRequestBody =
  | Iterial
  | IRequestQuery
  | FormData
  | File
  | Blob
  | ArrayBuffer
  | URLSearchParams
  | Stream
  | Buffer;

export interface IRequestHeader {
  [key: string]: Iterial | string[];
}

export interface ApiClient {
  execute: <T>(request: HttpRequestConfig) => Promise<T>;
}

export interface RequestCore {
  doRequest: (request: HttpRequestConfig) => Promise<HttpResponse<any>>;
}

export interface HttpResponse<T> {
  headers: IRequestHeader;
  statusCode: number;
  errMsg: string;
  data: T;
}

export interface HttpRequestConfig {
  query?: IRequestQuery; // url query
  body?: IRequestBody; // body array
  method?: "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
  headers?: IRequestHeader; // default get
  /**
   * path of request url
   */
  path?: string;
  /**
   * host of request url
   */
  host?: string;
  /**
   * if this is set , host and path while be ignored , otherwise url = host+path
   */
  url?: string;
  /**
   * only exist in client,custome config
   */
  clientConfig?: Record<string, any>;
}

export type InterceptorResult<T> = T;

export interface ClientConfig {
  host?: string;
  requestCore: RequestCore;
  interceptors?: Interceptor<any>[];
  errorHandler?: (err: any) => void;
}

export type ChainedInterceptor<T> = (
  param: HttpRequestConfig
) => Promise<InterceptorResult<T>>;

export type Interceptor<T> = (
  param: HttpRequestConfig,
  next: ChainedInterceptor<T>
) => Promise<InterceptorResult<T>>;

class Request<T> {
  interceptors: Interceptor<T>[];

  constructor(interceptors: Interceptor<T>[]) {
    this.interceptors = interceptors;
  }

  private next(nextIndex: number, req: HttpRequestConfig): Promise<T> {
    const intercept = this.interceptors[nextIndex];
    return intercept(
      req,
      (nextIndex >= this.interceptors.length
        ? null
        : this.next.bind(this, nextIndex + 1)) as ChainedInterceptor<T>
    );
  }

  async launch(request: HttpRequestConfig): Promise<T> {
    return this.interceptors[0](request, this.next.bind(this, 1));
  }
}

const DEFAULT_INTERCEPTORS = [
  async function (
    req: HttpRequestConfig,
    next: ChainedInterceptor<HttpResponse<any>>
  ) {
    const resp = await next(req);
    if (resp.statusCode < 200 || resp.statusCode >= 300) {
      throw new ApiError(resp.errMsg, resp.statusCode, resp);
    }
    return resp;
  },
] as Interceptor<any>[];

function httpRequestIntercept(requestCore: RequestCore) {
  return async function (request: HttpRequestConfig) {
    const config = { ...request };
    return await requestCore.doRequest(config);
  };
}

export class ApiClientImpl implements ApiClient {
  config: ClientConfig;
  interceptors: Interceptor<any>[];

  constructor(config: ClientConfig) {
    this.config = config;
    this.interceptors = config.interceptors || DEFAULT_INTERCEPTORS;
    this.interceptors.push(httpRequestIntercept(config.requestCore));
  }

  async execute<T>(request: HttpRequestConfig): Promise<T> {
    let httpResponse: HttpResponse<any> | undefined;
    try {
      if (!request.url) {
        if (request.host) {
          request.url = request.host + request.path;
        } else if (this.config.host) {
          request.url = this.config.host + request.path;
        } else {
          request.url = request.path;
        }
      }
      return (await new Request(this.interceptors).launch(request)) as T;
    } catch (e: any) {
      this.config.errorHandler?.(e);
      if (e instanceof ApiError) {
        return Promise.reject(e);
      }
      return Promise.reject(new ApiError(e.message, undefined, httpResponse));
    }
  }
}

export default function createInstance(config: ClientConfig) {
  return new ApiClientImpl(config);
}
