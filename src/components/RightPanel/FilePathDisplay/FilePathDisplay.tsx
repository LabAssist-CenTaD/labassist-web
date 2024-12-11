import "./FilePathDisplay.css";
import { useSelectedFileContext } from "../../../hooks/useSelectedFileContext";

export const FilePathDisplay = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();

  return (
    <div className="file-path-display">
      <div className="file-path-header">Selected Video Path:</div>
      <div className="file-path">
        {selectedFile.filePath || "No file selected"}
      </div>
    </div>
  );
};
