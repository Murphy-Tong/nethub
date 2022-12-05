import "reflect-metadata";
import { ApiClient, Header, Query } from "./ApiClientImpl";

const METHODS = Symbol();

type MethodOpt = {
  method?: string;
  path?: string;
  query?: Array<string>;
  field?: Array<string>;
  body?: Array<string>;
};
function ensureMethod(target: any, name: string): MethodOpt {
  let mds = Reflect.getMetadata(METHODS, target);
  if (mds?.[name]) {
    return mds[name];
  }
  if (!mds) {
    mds = {};
    Reflect.defineMetadata(METHODS, mds, target);
  }
  if (!mds[name]) {
    mds[name] = {};
  }
  return mds[name];
}

export function GET(path?: string) {
  return function (target: any, propertyKey: string) {
    const mdOpt = ensureMethod(target, propertyKey);
    mdOpt.path = path;
    mdOpt.method = "GET";
  };
}
export function POST(path?: string) {
  return function (target: any, propertyKey: string) {
    const mdOpt = ensureMethod(target, propertyKey);
    mdOpt.path = path;
    mdOpt.method = "POST";
  };
}

export function Query(name: string) {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    mdOpt.query = mdOpt.query || [];
    mdOpt.query[parameterIndex] = name;
  };
}

export function Field(name: string) {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    mdOpt.field = mdOpt.field || [];
    mdOpt.field[parameterIndex] = name;
  };
}

// export function Body(
//   target: Object,
//   propertyKey: string,
//   parameterIndex: number
// ) {
//   const mdOpt = ensureMethod(target, propertyKey);
//   mdOpt.body = mdOpt.body || [];
//   mdOpt.body[parameterIndex] = "body";
// }

interface IService<T> {
  new (): T;
  new (retro: Retro): T;
}

export function Service() {
  return function <T>(constructor: IService<T>) {
    return class {
      constructor(retro: Retro) {
        return new Proxy(this, {
          get(target, p, receiver) {
            const opts = ensureMethod(constructor.prototype, p as string);
            return function () {
              const args = [...arguments];
              const query: Query = {};
              const field: Query = {};
              const headers: Header = {};
              const body: any[] = [];
              args.forEach((val, index) => {
                let name = opts.query![index];
                if (name) {
                  query[name] = val;
                }
                name = opts.field![index];
                if (name) {
                  field[name] = val;
                }
                name = opts.body![index];
                if (name) {
                  body.push(val);
                }
              });
              return retro.client.execute({
                api: opts.path,
                query: query,
                field: field,
                data: body,
                method: opts.method,
                headers,
              });
            };
          },
        });
      }
    } as IService<T>;
  };
}

export default class Retro {
  client: ApiClient;
  constructor(client: ApiClient) {
    this.client = client;
  }

  instance<T>(cls: IService<T>): T {
    return new cls(this);
  }
}
