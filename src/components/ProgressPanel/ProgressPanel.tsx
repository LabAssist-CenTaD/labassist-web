import "./ProgressPanel.css";

import { MediaControls } from "./MediaControls/MediaControls";

export const ProgressPanel = (): JSX.Element => {
  return (
    <div className="progress-panel">
      <MediaControls />
    </div>
  );
};
