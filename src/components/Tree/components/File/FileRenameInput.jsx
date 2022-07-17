import { useEffect } from "react";
import { getSiblings } from "../../../../utils/utils";
import { useTreeContext } from "../../state";
import { handleRename } from "../../state/reducer";
import { resetRename, setNewName } from "./FileState";

const onEnterKeyPress =
  (fn) =>
  ({ keyCode }) =>
    keyCode === 13 ? fn() : null;

function FileRenameInput({ path, state, dispatch }) {
  const { state: treeState, dispatch: treeDispatch } = useTreeContext();

  useEffect(() => {
    const handleGlobalKeydown = onEnterKeyPress(handleSubmit);

    window.addEventListener("keydown", handleGlobalKeydown);

    return () => {
      window.removeEventListener("keydown", handleGlobalKeydown);
    };
  });

  const handleSubmit = () => {
    if (!siblingsName.has(state.newName)) {
      handleRename(treeDispatch, path, state.newName);
    }
    resetRename(dispatch);
  };

  const siblingsName = state.rename && getSiblings(treeState.tree, path);

  return (
    <div className="grow">
      <input
        autoFocus
        className={`bg-white w-full bg-opacity-40 rounded-sm px-0.5 focus:outline-none duration-100 ${
          siblingsName.has(state.newName) ? "text-red-400" : ""
        }`}
        value={state.newName}
        onChange={(e) => {
          setNewName(dispatch, e.target.value);
        }}
        onBlur={() => resetRename(dispatch)}
      />
    </div>
  );
}

export default FileRenameInput;
