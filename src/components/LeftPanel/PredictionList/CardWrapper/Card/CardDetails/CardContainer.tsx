import "./CardContainer.css";
import { FileDetails } from "./FileDetails/FileDetails";
import { ButtonWrapper } from "./ButtonWrapper/ButtonWrapper";
import { TagStatus } from "../../../../../../types/tagstatus";

interface CardContainerProps {
  fileName: string;
  filePath: string;
  status_list: TagStatus[];
}

export const CardContainer = ({
  fileName,
  filePath,
  status_list,
}: CardContainerProps): JSX.Element => {
  return (
    <div className="card-container">
      <FileDetails fileName={fileName} filePath={filePath} />
      <ButtonWrapper fileName={fileName} status_list={status_list} />
    </div>
  );
};
