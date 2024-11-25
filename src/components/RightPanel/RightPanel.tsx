import "./RightPanel.css";
import { FilePathDisplay } from "./FilePathDisplay/FilePathDisplay";

export const RightPanel = (): JSX.Element => {
  return (
    <div className="right-panel">
      <FilePathDisplay />
    </div>
  );
};
