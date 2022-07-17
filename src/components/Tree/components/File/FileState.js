export const defaultFileState = {
  currName: "",
  rename: false,
  newName: "",
};

export const FileActionTypes = {
  SET_RENAME: "SET_RENAME",
  SET_NEW_NAME: "SET_NEW_NAME",
  RESET_RENAME: "RESET_RENAME",
};

export const FileReducer = (state, action) => {
  switch (action.type) {
    case FileActionTypes.SET_RENAME: {
      return { ...state, rename: true };
    }
    case FileActionTypes.SET_NEW_NAME: {
      return { ...state, newName: action.payload.name };
    }
    case FileActionTypes.RESET_RENAME: {
      return { ...state, rename: false, newName: "" };
    }
    default: {
      return state;
    }
  }
};

export const setRename = (dispatch) => {
  dispatch({ type: FileActionTypes.SET_RENAME });
};

export const resetRename = (dispatch) => {
  dispatch({ type: FileActionTypes.RESET_RENAME });
};

export const setNewName = (dispatch, name) => {
  dispatch({ type: FileActionTypes.SET_NEW_NAME, payload: { name } });
};
