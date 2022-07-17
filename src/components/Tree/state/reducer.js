import { findNodeByPath, setChildPathRecursively } from "../../../utils/utils";
import { ActionTypes } from "./constants";
import { sortedInsert } from "../../../utils/sortedInsert";

export const defaultState = {
  selectedNode: null,
  tree: {},
};

export const reducer = (state, action) => {
  switch (action.type) {
    case ActionTypes.SELECT_NODE: {
      return { ...state, selectedNode: action.payload.path };
    }

    case ActionTypes.RENAME_FILE:
    case ActionTypes.RENAME_FOLDER: {
      const newTree = structuredClone(state.tree);
      let [parent, node] = findNodeByPath(newTree, action.payload.path);
      node.name = action.payload.name;
      setChildPathRecursively(node, parent.path);
      return { ...state, tree: newTree, selectedNode: node.path };
    }

    case ActionTypes.CREATE_FILE: {
      const newTree = structuredClone(state.tree);
      let [parent, node] = findNodeByPath(newTree, action.payload.path);
      const extension = action.payload.name.split(".");
      const fileMetaData = {
        name: action.payload.name,
        path: node.path + "\\" + action.payload.name,
        extension: extension.length > 1 ? "." + extension.pop() : "",
      };
      node.children = sortedInsert(node.children, fileMetaData);
      return { ...state, tree: newTree };
    }

    case ActionTypes.CREATE_FOLDER: {
      const newTree = structuredClone(state.tree);
      let [parent, node] = findNodeByPath(newTree, action.payload.path);
      const folderMetaData = {
        name: action.payload.name,
        path: node.path + "\\" + action.payload.name,
        children: [],
      };
      node.children = sortedInsert(node.children, folderMetaData);
      return { ...state, tree: newTree };
    }

    case ActionTypes.DELETE_FILE:
    case ActionTypes.DELETE_FOLDER: {
      const newTree = structuredClone(state.tree);
      let [parent, node] = findNodeByPath(newTree, action.payload.path);
      parent.children = parent.children.filter(
        (child) => child.path !== node.path
      );
      return { ...state, tree: newTree };
    }

    default: {
      return state;
    }
  }
};

//Handler Functions

export const handleSelect = (dispatch, path) => {
  dispatch({ type: ActionTypes.SELECT_NODE, payload: { path } });
};

export const handleRename = (dispatch, path, name) => {
  dispatch({
    type: ActionTypes.RENAME_FOLDER,
    payload: { path, name },
  });
};

export const handleAddFile = (dispatch, path, name) => {
  dispatch({ type: ActionTypes.CREATE_FILE, payload: { path, name } });
};

export const handleAddFolder = (dispatch, path, name) => {
  dispatch({ type: ActionTypes.CREATE_FOLDER, payload: { path, name } });
};

export const handleDelete = (dispatch, path) => {
  dispatch({ type: ActionTypes.DELETE_FILE, payload: { path } });
};
