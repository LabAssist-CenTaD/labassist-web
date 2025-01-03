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
  // Check if the status list contains 'predicting' and conditionally add the class
  // const isPredicting = status_list.includes("predicting");

  return (
    <div
      className={`card ${isSelected ? "selected" : ""}`}
      onClick={onClick} // Add click handler
    >
      <StatusBar status_list={status_list} status_counts={status_counts} />
      <CardContainer
        fileName={fileName}
        filePath={filePath}
        status_list={status_list}
      />
    </div>
  );
};
