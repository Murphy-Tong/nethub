import { ApiClient } from "../ApiClientImpl";
declare type IClientProvider = {
    getClient(): ApiClient;
};
export interface IService<T> {
    new (): T;
    new (hub: IClientProvider): T;
}
export declare function Service(baseURL: string): <T>(constructor: IService<T>) => IService<T>;
export declare function Service<T>(constructor: IService<T>): IService<T>;
export {};
