import { TagWrapper } from "./TagWrapper/TagWrapper";
import { StatusCount } from "./StatusCount/StatusCount";

import "./StatusBar.css";
import { TagStatus } from "./TagWrapper/Tag/Tag";

interface StatusBarProps {
  status_list: TagStatus[];
  status_counts?: {
    correct: number;
    warning: number;
    error: number;
  };
}

export const StatusBar = ({
  status_list,
  status_counts,
}: StatusBarProps): JSX.Element => {
  return (
    <div className="status-bar">
      <TagWrapper status_list={status_list} />
      <StatusCount status_counts={status_counts} />
    </div>
  );
};
