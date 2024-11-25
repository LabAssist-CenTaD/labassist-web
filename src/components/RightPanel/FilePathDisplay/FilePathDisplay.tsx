import "./FilePathDisplay.css";
import { useState, useEffect } from "react";
import { selectedFilePath } from "../../../shared/selectedFile";

export const FilePathDisplay = (): JSX.Element => {
  const [filePath, setFilePath] = useState(selectedFilePath);

  useEffect(() => {
    const interval = setInterval(() => {
      setFilePath(selectedFilePath); // Update state to reflect changes
    }, 100); // Check for updates periodically

    return () => clearInterval(interval); // Clean up the interval
  }, []);
  return (
    <div className="file-path-display">
      <div className="file-path-header">Selected Video Path:</div>
      <div className="file-path">{filePath || "No file selected"}</div>
    </div>
  );
};
