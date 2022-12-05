import "reflect-metadata";
import {
  ApiClient,
  Iterial,
  IRequestHeader,
  IRequestQuery,
  IRequestBody,
} from "./ApiClientImpl";

interface IService<T> {
  new (): T;
  new (retro: Retro): T;
}

const METHODS = Symbol();

type MethodOpt = {
  method?: string;
  path?: string;
  query?: Array<string>;
  field?: Array<string>;
  body?: Array<string>;
  header?: Array<string>;
  commonHeader?: Array<[string, Iterial]>;
  commonQuery?: IRequestQuery[];
  commonField?: IRequestQuery[];
  commonBody?: IRequestBody;
};

function collectCommon(opt: MethodOpt, key: keyof MethodOpt, val: any) {
  let target = opt[key];
  if (!target) {
    target = [];
    // @ts-ignore
    opt[key] = target as any[];
  }
  // @ts-ignore
  target.push(val);
}

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

type MethodDecorator = (target: Object, propertyKey: string) => void;
type FieldDecorator = (
  target: Object,
  propertyKey: string,
  parameterIndex: number
) => void;

export function Query(name: string): FieldDecorator;
export function Query(name: string, value: Iterial): MethodDecorator;
export function Query() {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    if (arguments.length === 2) {
      collectCommon(mdOpt, "commonQuery", [...arguments]);
      return;
    }
    mdOpt.query = mdOpt.query || [];
    mdOpt.query[parameterIndex] = arguments[0];
  };
}

export function Header(name: string): FieldDecorator;
export function Header(name: string, value: Iterial): MethodDecorator;
export function Header() {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    if (arguments.length === 2) {
      collectCommon(mdOpt, "commonHeader", [...arguments]);
      return;
    }
    mdOpt.header = mdOpt.header || [];
    mdOpt.header[parameterIndex] = arguments[0];
  };
}

export function Field(name: string): FieldDecorator;
export function Field(name: string, value: Iterial): MethodDecorator;
export function Field() {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    if (arguments.length === 2) {
      collectCommon(mdOpt, "commonField", [...arguments]);
      return;
    }
    mdOpt.field = mdOpt.field || [];
    mdOpt.field[parameterIndex] = arguments[0];
  };
}

export function Body(): FieldDecorator;
export function Body(value: IRequestBody): MethodDecorator;
export function Body() {
  return function (
    target: Object,
    propertyKey: string,
    parameterIndex: number
  ) {
    const mdOpt = ensureMethod(target, propertyKey);
    if (arguments.length === 1) {
      mdOpt.commonBody = arguments[0];
      return;
    }
    mdOpt.body = mdOpt.body || [];
    mdOpt.body[parameterIndex] = "body";
  };
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
              let query: IRequestQuery | undefined = undefined;
              let field: IRequestQuery | undefined = undefined;
              let header: IRequestHeader | undefined = undefined;
              let body: IRequestBody | undefined = undefined;
              args.forEach((val, index) => {
                let name = opts.query?.[index];
                if (name) {
                  query = query || {};
                  query[name] = val;
                }
                name = opts.field?.[index];
                if (name) {
                  field = field || {};
                  field[name] = val;
                }
                name = opts.body?.[index];
                if (name) {
                  body = val;
                }
                name = opts.header?.[index];
                if (name) {
                  header = header || {};
                  header[name] = val?.toString();
                }
              });

              opts.commonHeader?.forEach(([name, val]) => {
                if (!header) {
                  header = {};
                }
                if (header[name]) {
                  if (Array.isArray(header[name])) {
                    (header[name] as Array<any>).push(val?.toString());
                  } else {
                    header[name] = [
                      header[name]?.toString() ?? "",
                      val?.toString() ?? "",
                    ];
                  }
                }
              });

              opts.commonField?.forEach((commonField) => {
                if (!field) {
                  field = {};
                }
                Object.keys(commonField).forEach((key) => {
                  if (Reflect.has(field!, key)) {
                    return;
                  }
                  field![key] = commonField[key];
                });
              });

              opts.commonQuery?.forEach((commonQuery) => {
                if (!query) {
                  query = {};
                }
                Object.keys(commonQuery).forEach((key) => {
                  if (Reflect.has(query!, key)) {
                    return;
                  }
                  query![key] = commonQuery[key];
                });
              });

              body = body ?? opts.commonBody;

              return retro.client.execute({
                api: opts.path,
                query,
                body: field || body,
                method: opts.method,
                headers: header,
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
