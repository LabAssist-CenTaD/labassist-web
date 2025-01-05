import "./ProgressBar.css";

import { TimeBar } from "./TimeBar/TimeBar";

export const ProgressBar = (): JSX.Element => {
  return (
    <div className="progress-bar">
      <TimeBar currentSeconds={200} durationSeconds={600} />
    </div>
  );
};
