import "./ProgressPanel.css";

import { MediaControls } from "./MediaControls/MediaControls";
import { TimeDisplay } from "./TimeDisplay/TimeDisplay";
import { ProgressBar } from "./ProgressBar/ProgressBar";

export const ProgressPanel = (): JSX.Element => {
  return (
    <div className="progress-panel">
      <MediaControls />
      <ProgressBar />
      <TimeDisplay currentSeconds={200} durationSeconds={600} />
    </div>
  );
};
