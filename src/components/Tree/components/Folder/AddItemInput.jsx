import { useEffect } from "react";
import { getChildren } from "../../../../utils/utils";
import { useTreeContext } from "../../state";
import { FiChevronRight } from "react-icons/fi";
import { FiFile } from "react-icons/fi";
import { handleAddFolder, handleAddFile } from "../../state/reducer";
import { resetAddItem, setAddItemName } from "./FolderState";

const onEnterKeyPress =
  (fn) =>
  ({ keyCode }) =>
    keyCode === 13 ? fn() : null;

function AddItemInput({ path, state, dispatch }) {
  const { state: treeState, dispatch: treeDispatch } = useTreeContext();

  useEffect(() => {
    const handleGlobalKeydown = onEnterKeyPress(handleAddItem);
    window.addEventListener("keydown", handleGlobalKeydown);
    return () => {
      window.removeEventListener("keydown", handleGlobalKeydown);
    };
  });

  const handleAddItem = () => {
    if (!childrenName.has(state.addItemName)) {
      if (state.addItemIsFolder) {
        handleAddFolder(treeDispatch, path, state.addItemName);
      } else {
        handleAddFile(treeDispatch, path, state.addItemName);
      }
    }
    resetAddItem(dispatch);
  };

  const childrenName = state.addItem && getChildren(treeState.tree, path);

  return (
    <div className="input-item overflow-hidden">
      <div className="shrink-0">
        {state.addItemIsFolder ? (
          <FiChevronRight size={17} className={`mr-1 duration-200`} />
        ) : (
          <FiFile size={13} className={`mr-1 duration-200`} />
        )}
      </div>
      <div className="grow">
        <input
          autoFocus
          className={`bg-white w-full bg-opacity-40 rounded-sm px-0.5 focus:outline-none duration-100 ${
            childrenName.has(state.addtemName) ? "text-red-400" : ""
          }`}
          value={state.addItemName}
          onChange={(e) => {
            setAddItemName(dispatch, e.target.value);
          }}
          onBlur={() => resetAddItem(dispatch)}
        />
      </div>
    </div>
  );
}

export default AddItemInput;
