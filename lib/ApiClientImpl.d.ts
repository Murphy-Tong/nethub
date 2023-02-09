/// <reference types="node" />
/// <reference types="node" />
import type { Stream } from "stream";
export declare type Iterial = undefined | string | number | boolean;
export interface IRequestQuery {
    [key: string]: Iterial | Iterial[] | IRequestQuery;
}
export declare type IRequestBody = Iterial | IRequestQuery | FormData | File | Blob | ArrayBuffer | URLSearchParams | Stream | Buffer;
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
    query?: IRequestQuery;
    body?: IRequestBody;
    method?: "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
    headers?: IRequestHeader;
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
export declare type InterceptorResult<T> = T;
export interface ClientConfig {
    host?: string;
    requestCore: RequestCore;
    interceptors?: Interceptor<any>[];
    errorHandler?: (err: any) => void;
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
