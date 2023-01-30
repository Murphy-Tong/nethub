import { NetHubInterpreter } from "./define/decorator";

type TreeNode = {
  decorators?: NetHubInterpreter[];
  subTree?: Record<string, TreeNode>;
};

const EMPTY_TREE = {};
const DECORATOR_TREE = new Map<object, TreeNode>();

function addTree(
  interpreter: NetHubInterpreter,
  tree: TreeNode,
  ...path: string[]
) {
  if (!path.length) {
    tree.decorators = tree.decorators || [];
    tree.decorators.push(interpreter);
    return;
  }
  tree.subTree = tree.subTree || {};
  tree.subTree[path[0]] = tree.subTree[path[0]] || {};
  addTree(interpreter, tree.subTree[path[0]], ...path.slice(1));
}

function getTree(
  subTree: TreeNode,
  ...path: string[]
): NetHubInterpreter[] | undefined {
  if (!subTree) {
    return;
  }
  if (!path?.length) {
    return subTree.decorators;
  }
  return getTree(subTree.subTree?.[path[0]] || EMPTY_TREE, ...path.slice(1));
}

export function addNetHubInterpreter(
  interpreter: NetHubInterpreter,
  target: object,
  ...path: string[]
) {
  let tree = DECORATOR_TREE.get(target);
  if (!tree) {
    tree = {};
    DECORATOR_TREE.set(target, tree);
  }
  addTree(interpreter, tree, ...path);
}

export function getNetHubInterpreter(target: object, ...path: string[]) {
  return getTree(DECORATOR_TREE.get(target) || EMPTY_TREE, ...path);
}
