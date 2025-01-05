import "./ProgressPanel.css";

import { MediaControls } from "./MediaControls/MediaControls";
import { TimeDisplay } from "./TimeDisplay/TimeDisplay";

export const ProgressPanel = (): JSX.Element => {
  return (
    <div className="progress-panel">
      <MediaControls />
      <TimeDisplay currentTime={"00:02:21"} duration={"00:10:42"} />
    </div>
  );
};
