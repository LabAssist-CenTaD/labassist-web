import "./Card.css";
import { StatusBar } from "./StatusBar/StatusBar";
import { CardContainer } from "./CardDetails/CardContainer";
import { TagStatus } from "../../../../../types/tagstatus";

interface CardProps {
  status_list: TagStatus[];
  status_counts?: {
    info: number;
    warning: number;
    error: number;
  };
  fileName: string;
  filePath: string;
  onClick: () => void;
  cardClass: string; // Accept cardClass prop
}

export const Card = ({
  status_list,
  status_counts,
  fileName,
  filePath,
  onClick,
  cardClass, // Use the class passed as prop
}: CardProps): JSX.Element => {
  return (
    <div className={cardClass} onClick={onClick}>
      <StatusBar status_list={status_list} status_counts={status_counts} />
      <CardContainer
        fileName={fileName}
        filePath={filePath}
        status_list={status_list}
      />
    </div>
  );
};
