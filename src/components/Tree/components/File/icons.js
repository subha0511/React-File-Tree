import { FaJsSquare, FaHtml5, FaCss3Alt, FaFile } from "react-icons/fa";
import { FiFile } from "react-icons/fi";
import { VscJson, VscTerminalCmd } from "react-icons/vsc";

export const icons = {
  ".js": FaJsSquare,
  ".json": VscJson,
  ".css": FaCss3Alt,
  ".html": FaHtml5,
  ".cmd": VscTerminalCmd,
  default: FiFile,
};
