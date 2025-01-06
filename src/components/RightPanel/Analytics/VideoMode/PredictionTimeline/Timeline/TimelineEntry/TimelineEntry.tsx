import "./TimelineEntry.css";

import { Annotation } from "../../../../../../../types/jsondata";
import { TimestampLabel } from "./TimestampLabel/TimestampLabel";

interface TimelineEntryProps {
  type: "info" | "warning" | "error";
  timestamp: string;
  message: string;
  highlighted: boolean;
  highlightedTimelineAnnotation: Annotation | null;
}

export const TimelineEntry = ({
  type,
  timestamp,
  message,
  highlighted,
  highlightedTimelineAnnotation,
}: TimelineEntryProps) => {
  const generateHighlightClass = () => {
    if (highlightedTimelineAnnotation) {
      if (highlighted) {
        return "";
      } else {
        return "dimmed";
      }
    } else {
      return "";
    }
    return false;
  };

  return (
    <div className={`timeline-entry ${generateHighlightClass()}`}>
      <TimestampLabel timestamp={timestamp} type={type} />
      <div className="message">{message}</div>
    </div>
  );
};
