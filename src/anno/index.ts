import "reflect-metadata";
import { ApiClient, HttpRequestConfig } from "../ApiClientImpl";
import { getNetHubInterpreter } from "./interceptors";
import { NetHubInterpreter } from "./define/decorator";

export interface IService<T> {
  new (): T;
  new (NetHub: NetHub): T;
}

function createServiceProxy<T>(constructor: IService<T>, host?: string) {
  return class {
    constructor(hub: NetHub) {
      return new Proxy(this, {
        get(target, p, receiver) {
          return async function () {
            const args = [...arguments];
            let config: HttpRequestConfig = {};

            if (host) {
              config.baseUrl = host;
            }

            const resolve = async function (
              throwMsg?: string,
              interpreters?: NetHubInterpreter[],
              val?: any,
              index?: number
            ) {
              if (throwMsg && !interpreters?.length) {
                throw new Error(throwMsg);
              }

              const l = interpreters?.length || 0;
              for (let i = 0; i < l; i++) {
                const interpreter = interpreters![i];
                const res = interpreter(
                  config,
                  val,
                  constructor.prototype,
                  p,
                  index
                );
                if (res instanceof Promise) {
                  config = await res;
                } else {
                  config = res;
                }
              }
            };

            // 类注解
            await resolve(
              undefined,
              getNetHubInterpreter(constructor.prototype)
            );

            // 方法注解
            resolve(
              "NetHub: 方法 缺少注解 @Method/@GET/@POST...",
              getNetHubInterpreter(constructor.prototype, p.toString())
            );

            // 参数注解
            if (args.length) {
              await Promise.all(
                args.map((val, index) => {
                  return resolve(
                    undefined,
                    getNetHubInterpreter(
                      constructor.prototype,
                      p.toString(),
                      String(index)
                    ),
                    val,
                    index
                  );
                })
              );
            }

            if (!config.method) {
              throw new Error(
                `NetHub: 方法 ${p.toString()} request method 未定义`
              );
            }

            return hub.getClient()!.execute(config);
          };
        },
      });
    }
  } as IService<T>;
}

export function Service(
  host: string
): <T>(constructor: IService<T>) => IService<T>;

export function Service<T>(constructor: IService<T>): IService<T>;

export function Service<T>(
  param: IService<T> | string
): IService<T> | ((constructor: IService<T>) => IService<T>) {
  if (typeof param === "string") {
    return function (constructor: IService<T>) {
      return createServiceProxy(constructor as IService<T>, param);
    };
  }
  return createServiceProxy(param as IService<T>);
}

export default class NetHub {
  private client: ApiClient | undefined;

  setClient(client: ApiClient) {
    this.client = client;
    return this;
  }

  getClient() {
    return this.client;
  }

  create<T>(cls: IService<T>): T {
    return new cls(this);
  }
}

export * from "./define/cls";
export * from "./define/decorator";
export * from "./define/field";
export * from "./define/method";
export * from "./field";
export * from "./header";
export * from "./method";
export * from "./query";

