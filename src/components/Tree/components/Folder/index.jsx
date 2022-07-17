import { useReducer } from "react";
import { FiChevronRight } from "react-icons/fi";
import { FiFilePlus, FiFolderPlus } from "react-icons/fi";
import FolderDropdown from "./FolderDropdown";
import FolderRenameInput from "./FolderRenameInput";
import {
  defaultFolderState,
  handleExpand,
  folderReducer,
  setAddItem,
} from "./FolderState";
import AddItemInput from "./AddItemInput";
import { useTreeContext } from "../../state";
import { handleSelect } from "../../state/reducer";
import File from "../File";

function Folder({ data, expanded, root }) {
  const [state, dispatch] = useReducer(folderReducer, {
    ...defaultFolderState,
    expanded: expanded ?? false,
    currName: data.name,
  });
  const { state: treeState, dispatch: treeDispatch } = useTreeContext();

  const handleAddFile = () => {
    setAddItem(dispatch, false);
  };

  const handleAddFolder = () => {
    setAddItem(dispatch, true);
  };

  const isSelected = treeState.selectedNode === data.path;

  return (
    <div className="flex flex-col">
      {root ? (
        <div className="px-2 py-1 border-b flex items-center gap-x-3">
          <div className="grow">{data.name}</div>
          <div
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={handleAddFile}
          >
            <FiFilePlus size={18} />
          </div>
          <div
            className="text-gray-600 hover:text-gray-900 cursor-pointer"
            onClick={handleAddFolder}
          >
            <FiFolderPlus size={18} />
          </div>
        </div>
      ) : (
        <div
          className={`tree-item group ${isSelected ? "selected" : ""}`}
          onClick={() => {
            handleSelect(treeDispatch, data.path);
            handleExpand(dispatch, !state?.expanded);
          }}
        >
          <FiChevronRight
            size={17}
            className={`mr-1 shrink-0 duration-200 ${
              state?.expanded ? "rotate-90" : ""
            }`}
          />
          {state?.rename ? (
            <FolderRenameInput
              path={data.path}
              state={state}
              dispatch={dispatch}
            />
          ) : (
            <>
              <div className="tree-item-label">{data.name}</div>
              <FolderDropdown
                path={data.path}
                dispatch={dispatch}
                treeDispatch={treeDispatch}
              />
            </>
          )}
        </div>
      )}
      {state?.expanded && (
        <div className={`${root ? "" : "pl-3"}`}>
          {state.addItem && (
            <div className="max-w-full">
              <AddItemInput
                path={data.path}
                state={state}
                dispatch={dispatch}
              />
            </div>
          )}
          {data.children.map((child) => (
            <div key={child.name}>
              {child.children !== undefined ? (
                <Folder data={child} />
              ) : (
                <File data={child} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Folder;
