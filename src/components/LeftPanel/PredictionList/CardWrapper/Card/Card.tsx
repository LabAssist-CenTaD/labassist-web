import { StatusBar } from "./StatusBar/StatusBar";
import "./Card.css";
import { CardContainer } from "./CardDetails/CardContainer";
import { TagStatus } from "./StatusBar/TagWrapper/Tag/Tag";

interface CardProps {
  status_list: TagStatus[];
  status_counts?: {
    correct: number;
    warning: number;
    error: number;
  };
  fileName: string;
  filePath: string;
  isSelected: boolean;
  onClick: () => void;
}

export const Card = ({
  status_list,
  status_counts,
  fileName,
  filePath,
  isSelected,
  onClick,
}: CardProps): JSX.Element => {
  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onClick} // Add click handler
    >
      <StatusBar status_list={status_list} status_counts={status_counts} />
      <CardContainer fileName={fileName} filePath={filePath} />
    </div>
  );
};
