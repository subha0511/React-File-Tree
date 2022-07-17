import { BsThreeDotsVertical } from "react-icons/bs";
import useDropdown from "../../../../hooks/useDropdown";
import { setAddItem, setRename } from "./FolderState";
import { handleSelect, handleDelete } from "../../state/reducer";

function FolderDropdown({ path, dispatch, treeDispatch }) {
  const [menuRef, isOpen, open, close] = useDropdown();

  const handleAddFile = () => {
    setAddItem(dispatch, false);
  };

  const handleAddFolder = () => {
    setAddItem(dispatch, true);
  };

  const handleDeleteFolder = () => {
    handleDelete(treeDispatch, path);
  };

  return (
    <>
      <div
        ref={menuRef}
        className={`tree-menu group-hover:block ${isOpen ? "" : "hidden"}`}
        onClick={(e) => {
          e.stopPropagation();
          isOpen ? close() : open();
          handleSelect(treeDispatch, path);
        }}
      >
        <BsThreeDotsVertical size={18} />
        {isOpen && (
          <div className="mt-1 z-10 min-w-fit rounded-md border bg-gray-50 absolute right-0 top-full overflow-hidden">
            <ul className=" flex divide-y flex-col">
              <MenuItem onClick={() => setRename(dispatch)}>Rename</MenuItem>
              <MenuItem onClick={handleAddFile}>Add File</MenuItem>
              <MenuItem onClick={handleAddFolder}>Add Folder</MenuItem>
              <MenuItem
                className="px-3 py-2 text-sm hover:bg-red-400 hover:text-white"
                onClick={handleDeleteFolder}
              >
                Delete Item
              </MenuItem>
            </ul>
          </div>
        )}
      </div>
    </>
  );
}

const MenuItem = ({ children, ...props }) => {
  return (
    <li className="px-3 py-2 text-sm hover:bg-gray-200" {...props}>
      {children}
    </li>
  );
};

export default FolderDropdown;
