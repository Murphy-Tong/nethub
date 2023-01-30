const EMPTY_TREE = {};
const DECORATOR_TREE = new Map();
function addTree(interpreter, tree, ...path) {
    if (!path.length) {
        tree.decorators = tree.decorators || [];
        tree.decorators.push(interpreter);
        return;
    }
    tree.subTree = tree.subTree || {};
    tree.subTree[path[0]] = tree.subTree[path[0]] || {};
    addTree(interpreter, tree.subTree[path[0]], ...path.slice(1));
}
function getTree(subTree, ...path) {
    var _a;
    if (!subTree) {
        return;
    }
    if (!(path === null || path === void 0 ? void 0 : path.length)) {
        return subTree.decorators;
    }
    return getTree(((_a = subTree.subTree) === null || _a === void 0 ? void 0 : _a[path[0]]) || EMPTY_TREE, ...path.slice(1));
}
export function addNetHubInterpreter(interpreter, target, ...path) {
    let tree = DECORATOR_TREE.get(target);
    if (!tree) {
        tree = {};
        DECORATOR_TREE.set(target, tree);
    }
    addTree(interpreter, tree, ...path);
}
export function getNetHubInterpreter(target, ...path) {
    return getTree(DECORATOR_TREE.get(target) || EMPTY_TREE, ...path);
}
