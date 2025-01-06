import "./FilePathDisplay.css";

import { useSelectedFileContext } from "../../../hooks/useSelectedFileContext";
import { useEffect, useState } from "react";

export const FilePathDisplay = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();

  const [fileName, setFileName] = useState<string>(
    selectedFile?.fileName || ""
  );

  useEffect(() => {
    setFileName(selectedFile.fileName || "");
  }, [selectedFile, fileName]);

  return (
    <div className="file-path-display">
      <div className="file-path-header">Selected Video:</div>
      <div className="file-path">{fileName || "No file selected"}</div>
    </div>
  );
};
