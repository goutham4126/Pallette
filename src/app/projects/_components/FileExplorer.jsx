"use client"
import { useSandpack } from "@codesandbox/sandpack-react";
import { SandpackFileExplorer } from "@codesandbox/sandpack-react";
import { useEffect, useState } from "react";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaCheck, FaTimes } from "react-icons/fa";

const FileExplorer = () => {
  const { sandpack } = useSandpack();
  const [files, setFiles] = useState(sandpack.files);
  const [newFilePath, setNewFilePath] = useState("");
  const [showFileInput, setShowFileInput] = useState(false);

  useEffect(() => {
    setFiles(sandpack.files);
  }, [sandpack.files]);

  const handleAddFile = () => {
    if (newFilePath) {
      if (files[newFilePath]) {
        alert("A file with this path already exists.");
        return;
      }
      setFiles((prevFiles) => ({
        ...prevFiles,
        [newFilePath]: { code: "" },
      }));
      sandpack.updateFile(newFilePath, "");
      setNewFilePath("");
      setShowFileInput(false);
    }
  };

  return (
    <div className="h-[95vh] overflow-y-scroll bg-white">
      <div className="flex items-center justify-center space-x-2 p-2">
        <h2 className="text-lg font-semibold">File Explorer</h2>
        <button
          onClick={() => setShowFileInput(!showFileInput)}
          className="rounded bg-green-600 p-2 text-white hover:bg-green-500"
        >
          <AiOutlineFileAdd />
        </button>
      </div>
      {showFileInput && (
        <div className="flex items-center space-x-2 px-1">
          <input
            type="text"
            value={newFilePath}
            onChange={(e) => setNewFilePath(e.target.value)}
            placeholder="Enter new file path"
            className="w-28 rounded border border-gray-600 p-1"
          />
          <div className="flex gap-1">
            <button
              onClick={handleAddFile}
              className="rounded bg-green-600 p-1 text-white hover:bg-green-500"
            >
              <FaCheck />
            </button>
            <button
              onClick={() => setShowFileInput(false)}
              className="rounded bg-red-600 p-1 text-white hover:bg-red-500"
            >
              <FaTimes />
            </button>
          </div>
        </div>
      )}
      <SandpackFileExplorer />
    </div>
  );
};

export default FileExplorer;
