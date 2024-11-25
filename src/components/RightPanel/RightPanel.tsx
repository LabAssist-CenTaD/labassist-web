import "./RightPanel.css";
import { FilePathDisplay } from "./FilePathDisplay/FilePathDisplay";
import { Analytics } from "./Analytics/Analytics";

export const RightPanel = (): JSX.Element => {
  return (
    <div className="right-panel">
      <FilePathDisplay />
      <Analytics />
    </div>
  );
};
