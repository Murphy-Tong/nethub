export declare type Iterial = undefined | string | number | boolean;
export interface IRequestQuery {
    [key: string]: Iterial | Iterial[] | IRequestQuery;
}
export declare type IRequestBody = Record<string, any> | any;
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
    params?: IRequestQuery;
    data?: IRequestBody;
    method?: "GET" | "POST" | "DELETE" | "PUT" | "HEAD" | string;
    headers?: IRequestHeader;
    /**
     * path of request url
     */
    path?: string;
    /**
     * host of request url
     */
    baseURL?: string;
    /**
     * if this is set , baseURL and path while be ignored , otherwise url = baseURL+path
     */
    url?: string;
    /**
     * only exist in client,custome config
     */
    clientConfig?: Record<string, any>;
}
export declare type InterceptorResult<T> = T;
export interface ClientConfig {
    baseURL?: string;
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
export declare function createInstance(config: ClientConfig): ApiClientImpl;
