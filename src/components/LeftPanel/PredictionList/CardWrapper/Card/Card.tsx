import { StatusBar } from "./StatusBar/StatusBar";
import "./Card.css";
import { CardDetails } from "./CardDetails/CardContainer";
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
}

export const Card = ({
  status_list,
  status_counts,
  fileName,
  filePath,
}: CardProps): JSX.Element => {
  return (
    <div className="card" id="">
      <StatusBar status_list={status_list} status_counts={status_counts} />
      <CardDetails fileName={fileName} filePath={filePath} />
    </div>
  );
};
