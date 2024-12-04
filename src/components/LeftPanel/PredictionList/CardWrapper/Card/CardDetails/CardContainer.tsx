import { FileDetails } from "./FileDetails/FileDetails";
import { ButtonWrapper } from "./ButtonWrapper/ButtonWrapper";
import "./CardContainer.css";

interface CardContainerProps {
  fileName: string;
  filePath: string;
}

export const CardContainer = ({
  fileName,
  filePath,
}: CardContainerProps): JSX.Element => {
  return (
    <div className="card-container">
      <FileDetails fileName={fileName} filePath={filePath} />
      <ButtonWrapper fileName={fileName} />
    </div>
  );
};
