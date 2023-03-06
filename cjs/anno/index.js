"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
class NetHub {
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
exports.default = NetHub;
__exportStar(require("./define/cls"), exports);
__exportStar(require("./define/decorator"), exports);
__exportStar(require("./define/field"), exports);
__exportStar(require("./define/method"), exports);
__exportStar(require("./field"), exports);
__exportStar(require("./header"), exports);
__exportStar(require("./method"), exports);
__exportStar(require("./query"), exports);
__exportStar(require("./service"), exports);
__exportStar(require("./host"), exports);
__exportStar(require("./url"), exports);
