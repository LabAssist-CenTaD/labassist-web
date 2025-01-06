import "./TimeDisplay.css";

import { formatTimeHHMMSS } from "../../../utils/timeUtils";
import { Colors } from "../../../styles/colors";
import { dotStream } from "ldrs";

dotStream.register();

interface TimeDisplayProps {
  currentSeconds: number;
  durationSeconds: number;
  isVideoLoading: boolean;
}

export const TimeDisplay = ({
  currentSeconds,
  durationSeconds,
  isVideoLoading,
}: TimeDisplayProps): JSX.Element => {
  if (isVideoLoading) {
    return (
      <div className="time-display">
        Loading
        <l-dot-stream size="24" speed="2.5" color={Colors.background} />
      </div>
    );
  }
  return (
    <div className="time-display">{`${formatTimeHHMMSS(
      currentSeconds
    )} / ${formatTimeHHMMSS(durationSeconds)}`}</div>
  );
};
