import "./TagWrapper.css";

import { Tag } from "./Tag/Tag";
import { TagStatus } from "../../../../../../../types/tagstatus";

interface TagWrapperProps {
  status_list: TagStatus[]; // Properly typed
}

export const TagWrapper = ({ status_list }: TagWrapperProps): JSX.Element => {
  return (
    <div className="tag-wrapper">
      {status_list.map((tag, index) => (
        <Tag key={index} status={tag} /> // No "any" needed here
      ))}
    </div>
  );
};
