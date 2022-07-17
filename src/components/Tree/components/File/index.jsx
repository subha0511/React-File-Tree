import { useReducer } from "react";
import { icons } from "./icons";
import FileMenuDropdown from "./FileMenuDropdown";
import FileRenameInput from "./FileRenameInput";
import { FileReducer, defaultFileState } from "./FileState";
import { useTreeContext } from "../../state";
import { handleSelect } from "../../state/reducer";

function File({ data }) {
  const { state: treeState, dispatch: treeDispatch } = useTreeContext();
  const [state, dispatch] = useReducer(FileReducer, defaultFileState);

  const Icon = icons[data.extension] || icons.default;

  const isSelected = treeState.selectedNode === data.path;

  return (
    <div
      className={`tree-item group ${isSelected ? "selected" : ""}`}
      onClick={() => handleSelect(treeDispatch, data.path)}
    >
      <Icon size={13} className="shrink-0 mr-2" />
      {state?.rename ? (
        <FileRenameInput path={data.path} state={state} dispatch={dispatch} />
      ) : (
        <>
          <div className="tree-item-label">{data.name}</div>
          <FileMenuDropdown
            path={data.path}
            dispatch={dispatch}
            treeDispatch={treeDispatch}
          />
        </>
      )}
    </div>
  );
}

export default File;
