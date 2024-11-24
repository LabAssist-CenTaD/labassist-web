import { TagWrapper } from "./TagWrapper/TagWrapper";
import { StatusCount } from "./StatusCount/StatusCount";

import "./StatusBar.css";

export const StatusBar = (): JSX.Element => {
  return (
    <div className="status-bar">
      <TagWrapper
        status_list={[
          "complete",
          "errors-present",
          "warnings-present",
          // "perfect",
          // "predicting",
          // "queued",
        ]}
      />
      <StatusCount
        status_counts={{
          correct: 5, // Number of correct items
          warning: 2, // Number of items with warnings
          error: 1, // Number of error items
        }}
      />
    </div>
  );
};
