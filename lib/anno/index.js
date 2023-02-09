import "reflect-metadata";
export default class NetHub {
    setClient(client) {
        this.client = client;
        return this;
    }
    getClient() {
        return this.client;
    }
    create(cls) {
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
export * from './service';
export * from './host';
export * from './url';
