export const defaultFolderState = {
  expanded: false,
  currName: "",
  rename: false,
  newName: "",
  addItem: false,
  addItemIsFolder: false,
  addItemName: "",
};

export const FolderActionTypes = {
  SET_EXPANDED: "SET_EXPANDED",
  SET_RENAME: "SET_RENAME",
  SET_NEW_NAME: "SET_NEW_NAME",
  RESET_RENAME: "RESET_RENAME",
  SET_ADD_ITEM: "SET_ADD_ITEM",
  SET_ADD_ITEM_NAME: "SET_ADD_ITEM_NAME",
  RESET_ADD_ITEM: "RESET_ADD_ITEM",
};

export const folderReducer = (state, action) => {
  switch (action.type) {
    case FolderActionTypes.SET_EXPANDED: {
      return { ...state, expanded: action.payload.value };
    }
    case FolderActionTypes.SET_RENAME: {
      return { ...state, rename: true };
    }
    case FolderActionTypes.SET_NEW_NAME: {
      return { ...state, newName: action.payload.name };
    }
    case FolderActionTypes.RESET_RENAME: {
      return { ...state, rename: false, newName: "" };
    }
    case FolderActionTypes.SET_ADD_ITEM: {
      return {
        ...state,
        expanded: true,
        addItem: true,
        addItemIsFolder: action.payload.type,
      };
    }
    case FolderActionTypes.SET_ADD_ITEM_NAME: {
      return { ...state, addItemName: action.payload.name };
    }
    case FolderActionTypes.RESET_ADD_ITEM: {
      return { ...state, addItem: false, addItemName: "" };
    }
  }
};

export const handleExpand = (dispatch, value) => {
  dispatch({ type: FolderActionTypes.SET_EXPANDED, payload: { value } });
};

export const setRename = (dispatch) => {
  dispatch({ type: FolderActionTypes.SET_RENAME });
};

export const resetRename = (dispatch) => {
  dispatch({ type: FolderActionTypes.RESET_RENAME });
};

export const setNewName = (dispatch, name) => {
  dispatch({ type: FolderActionTypes.SET_NEW_NAME, payload: { name } });
};

export const setAddItem = (dispatch, type) => {
  dispatch({ type: FolderActionTypes.SET_ADD_ITEM, payload: { type } });
};

export const setAddItemName = (dispatch, name) => {
  dispatch({ type: FolderActionTypes.SET_ADD_ITEM_NAME, payload: { name } });
};

export const resetAddItem = (dispatch) => {
  dispatch({ type: FolderActionTypes.RESET_ADD_ITEM });
};
