import { FileDetails } from "./FileDetails/FileDetails";
import { ButtonWrapper } from "./ButtonWrapper/ButtonWrapper";
import "./CardContainer.css";

interface CardDetailsProps {
  fileName: string;
  filePath: string;
}

export const CardDetails = ({
  fileName,
  filePath,
}: CardDetailsProps): JSX.Element => {
  return (
    <div className="card-details">
      <FileDetails fileName={fileName} filePath={filePath} />
      <ButtonWrapper />
    </div>
  );
};
