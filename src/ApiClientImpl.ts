import ApiError from "./ApiError";

export interface Query {
  [key: string]: undefined | string | number | boolean;
}

export interface Header {
  [key: string]: undefined | string | number | boolean | string[];
}

export interface ApiClient {
  execute: <T>(request: HttpRequestConfig) => Promise<T>;
}

export interface RequestCore {
  doRequest: (request: HttpRequestConfig) => Promise<HttpResponse<any>>;
}

export interface HttpResponse<T> {
  headers: Header;
  statusCode: number;
  errMsg: string;
  data: T;
}

export interface HttpRequestConfig {
  api?: string;
  query?: Query; // url query
  field?: Query; // post form fields
  data?: any; // body maybe array
  method?: "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
  headers?: Header; // default get
  url?: string; // fullurl: default url == baseUrl+api
  clientConfig?: Record<string, any>; // only exist in client,custome config
}

export type InterceptorResult<T> = T;

export interface ClientConfig {
  baseUrl?: string;
  requestCore: RequestCore;
  interceptors?: Interceptor<any>[];
  errorHandler?: (err: any) => boolean;
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

  private next(index: number, req: HttpRequestConfig): Promise<T> {
    const intercept = this.interceptors[index];
    return intercept(
      req,
      (index >= this.interceptors.length
        ? null
        : this.next.bind(this, index + 1)) as ChainedInterceptor<T>
    );
  }

  async execute(request: HttpRequestConfig): Promise<T> {
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
    delete config.clientConfig;
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
        if (this.config.baseUrl) {
          request.url = this.config.baseUrl + request.api;
        } else {
          request.url = request.api;
        }
      }
      return (await new Request(this.interceptors).execute(request)) as T;
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
