import "./Timeline.css";
import { HorizontalSeperator } from "../../../../../HorizontalSeperator/HorizontalSeperator";
import { TimelineEntry } from "./TimelineEntry/TimelineEntry";

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
  {
    type: "info",
    timestamp: "00:00:03",
    message: "System started successfully",
  },
  {
    type: "warning",
    timestamp: "00:00:05",
    message: "Battery level is low",
  },
  {
    type: "error",
    timestamp: "00:00:07",
    message: "Failed to connect to the server",
  },
  {
    type: "info",
    timestamp: "00:00:10",
    message: "User logged in",
  },
  {
    type: "warning",
    timestamp: "00:00:12",
    message: "Suspicious activity detected",
  },
  {
    type: "error",
    timestamp: "00:00:15",
    message: "Database connection timed out",
  },
  {
    type: "info",
    timestamp: "00:00:17",
    message: "Configuration settings updated",
  },
  {
    type: "warning",
    timestamp: "00:00:20",
    message: "Disk space running low",
  },
  {
    type: "error",
    timestamp: "00:00:22",
    message: "Application crash occurred",
  },
  {
    type: "info",
    timestamp: "00:00:25",
    message: "New update is available",
  },
  {
    type: "warning",
    timestamp: "00:00:28",
    message: "Network latency detected",
  },
  {
    type: "error",
    timestamp: "00:00:30",
    message: "Invalid user input",
  },
  {
    type: "info",
    timestamp: "00:00:35",
    message: "Backup completed successfully",
  },
  {
    type: "warning",
    timestamp: "00:00:40",
    message: "Unrecognized file format",
  },
  {
    type: "error",
    timestamp: "00:00:45",
    message: "Memory allocation failure",
  },
  {
    type: "info",
    timestamp: "00:00:50",
    message: "Task completed",
  },
  {
    type: "warning",
    timestamp: "00:00:55",
    message: "API response time exceeded",
  },
  {
    type: "error",
    timestamp: "00:01:00",
    message: "Access denied to the resource",
  },
];

export const Timeline = (): JSX.Element => {
  return (
    <div className="timeline">
      {timelineData.map((entry, index) => (
        <>
          <TimelineEntry
            key={index}
            type={entry.type}
            timestamp={entry.timestamp}
            message={entry.message}
          />
          {/* Add timeline seperator for every entry except last one */}
          {index < timelineData.length - 1 && (
            <HorizontalSeperator key={`separator-${index}`} />
          )}
        </>
      ))}
    </div>
  );
};
