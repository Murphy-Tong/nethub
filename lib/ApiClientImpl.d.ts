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
    query?: Query;
    field?: Query;
    data?: any;
    method?: "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
    headers?: Header;
    url?: string;
    clientConfig?: Record<string, any>;
}
export declare type InterceptorResult<T> = T;
export interface ClientConfig {
    baseUrl?: string;
    requestCore: RequestCore;
    interceptors?: Interceptor<any>[];
    errorHandler?: (err: any) => boolean;
}
export declare type ChainedInterceptor<T> = (param: HttpRequestConfig) => Promise<InterceptorResult<T>>;
export declare type Interceptor<T> = (param: HttpRequestConfig, next: ChainedInterceptor<T>) => Promise<InterceptorResult<T>>;
export declare class ApiClientImpl implements ApiClient {
    config: ClientConfig;
    interceptors: Interceptor<any>[];
    constructor(config: ClientConfig);
    execute<T>(request: HttpRequestConfig): Promise<T>;
}
export default function createInstance(config: ClientConfig): ApiClientImpl;
