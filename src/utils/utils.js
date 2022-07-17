export const findNodeById = (data, key, val) => {
  let item;
  function findItem(data, key, val) {
    if (data[key] === val) {
      item = data;
      return;
    }
    if (data.children) {
      findItem(data.children, key, val);
    }
  }
  findItem(data, key, val);
  return item;
};

export const findNodeByPath = (data, path) => {
  path = path.split("\\").filter((item) => item !== "");
  let parent = null;
  let node = data;
  while (path.length > 0) {
    parent = node;
    node = node.children && node.children.find((item) => item.name === path[0]);
    path.shift();
  }
  return [parent, node];
};

export const getSiblings = (data, path) => {
  let [parent, node] = findNodeByPath(data, path);
  if (parent === null) {
    return new Set([""]);
  }
  let fileNames = new Set(parent.children.map((item) => item.name));
  fileNames.add("");
  fileNames.delete(node.name);
  return fileNames;
};

export const getChildren = (data, path) => {
  const [parent, node] = findNodeByPath(data, path);
  const childrenNames = new Set(node.children.map((item) => item.name));
  childrenNames.add("");
  return childrenNames;
};

export const setChildPathRecursively = (data, path) => {
  data.path = path + "\\" + data.name;
  if (data.children) {
    data.children.forEach((item) => setChildPathRecursively(item, data.path));
  }
};
