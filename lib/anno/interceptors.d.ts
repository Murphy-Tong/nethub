import { NetHubInterpreter } from "./define/decorator";
export declare function addNetHubInterpreter(interpreter: NetHubInterpreter, target: object, ...path: string[]): void;
export declare function getNetHubInterpreter(target: object, ...path: string[]): NetHubInterpreter[] | undefined;
