import "./Timeline.css";
import { TimelineEntry } from "./TimelineEntry/TimelineEntry";
import { TimelineSeperator } from "./TimelineSeperator/TimelineSeperator";

const timelineData: {
  type: "info" | "warning" | "error";
  timestamp: string;
  message: string;
}[] = [
  {
    type: "info",
    timestamp: "00:00:00",
    message: "This is an info message",
  },
  {
    type: "warning",
    timestamp: "00:00:01",
    message: "This is a warning message",
  },
  {
    type: "error",
    timestamp: "00:00:02",
    message: "This is an error message",
  },
];

export const Timeline = (): JSX.Element => {
  return (
    <div className="timeline">
      {timelineData.map((entry, index) => (
        <>
          <TimelineEntry
            type={entry.type}
            timestamp={entry.timestamp}
            message={entry.message}
          />
          {/* Add timeline seperator for every entry except last one */}
          {index < timelineData.length - 1 && (
            <TimelineSeperator key={`separator-${index}`} />
          )}
        </>
      ))}
    </div>
  );
};
