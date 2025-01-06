import "./TimelineEntry.css";

import { Annotation } from "../../../../../../../types/jsondata";
import { TimestampLabel } from "./TimestampLabel/TimestampLabel";
import { formatTimeMMSS } from "../../../../../../../utils/timeUtils";

interface TimelineEntryProps {
  type: "info" | "warning" | "error";
  start_seconds: number;
  end_seconds: number;
  currentSeconds: number;
  message: string;
  highlighted: boolean;
  highlightedTimelineAnnotation: Annotation | null;
}

export const TimelineEntry = ({
  type,
  start_seconds,
  end_seconds,
  currentSeconds,
  message,
  highlighted,
  highlightedTimelineAnnotation,
}: TimelineEntryProps) => {
  const generateHighlightClassOnHover = () => {
    if (highlightedTimelineAnnotation) {
      if (highlighted) {
        return "";
      } else {
        return "hover-dimmed";
      }
    } else {
      return "";
    }
  };

  const generateActive = () => {
    if (currentSeconds >= start_seconds && currentSeconds <= end_seconds) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className={`timeline-entry ${generateHighlightClassOnHover()}`}>
      <TimestampLabel
        timestamp={formatTimeMMSS(start_seconds)}
        type={type}
        active={generateActive()}
      />
      <div className="message">{message}</div>
    </div>
  );
};
