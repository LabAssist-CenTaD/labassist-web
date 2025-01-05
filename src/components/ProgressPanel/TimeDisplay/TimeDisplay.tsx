import "./TimeDisplay.css";

import { formatTimeHHMMSS } from "../../../utils/timeUtils";

interface TimeDisplayProps {
  currentSeconds: number;
  durationSeconds: number;
}

export const TimeDisplay = ({
  currentSeconds,
  durationSeconds,
}: TimeDisplayProps): JSX.Element => {
  return (
    <div className="time-display">{`${formatTimeHHMMSS(
      currentSeconds
    )} / ${formatTimeHHMMSS(durationSeconds)}`}</div>
  );
};
