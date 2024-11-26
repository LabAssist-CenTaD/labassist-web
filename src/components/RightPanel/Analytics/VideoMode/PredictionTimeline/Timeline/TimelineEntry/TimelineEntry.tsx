import "./TimelineEntry.css";
import { TimestampLabel } from "./TimestampLabel/TimestampLabel";

interface TimelineEntryProps {
  type: "info" | "warning" | "error";
  timestamp: string;
  message: string;
}

export const TimelineEntry = ({
  type,
  timestamp,
  message,
}: TimelineEntryProps) => {
  return (
    <div className="timeline-entry">
      <TimestampLabel timestamp={timestamp} type={type} />
      <div className="message">{message}</div>
    </div>
  );
};
