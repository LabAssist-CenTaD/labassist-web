import "./Timeline.css";
import { TimelineEntry } from "./TimelineEntry/TimelineEntry";
import { TimelineSeperator } from "./TimelineSeperator/TimelineSeperator";
export const Timeline = (): JSX.Element => {
  return (
    <div className="timeline">
      <TimelineEntry
        type="info"
        timestamp="00:00:00"
        message="This is an info message"
      />
      <TimelineSeperator />
    </div>
  );
};
