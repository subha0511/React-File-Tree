import React from "react";
import { ActionTypes } from "./constants";

const defaultValue = {
  dispatch: null,
  state: null,
};

const TreeContext = React.createContext(defaultValue);

const useTreeContext = () => React.useContext(TreeContext);

export { TreeContext, useTreeContext };
