import React, { useReducer } from "react";
import { structure as data } from "../../demo/structure.js";
import { TreeContext, reducer, defaultState } from "./state";
import Folder from "./components/Folder";

function Tree() {
  const [state, dispatch] = useReducer(reducer, {
    ...defaultState,
    tree: data,
    selectedNode: data.path,
  });

  return (
    <>
      <TreeContext.Provider value={{ state, dispatch }}>
        <Folder data={state.tree} expanded={true} root />
      </TreeContext.Provider>
    </>
  );
}

export default Tree;
