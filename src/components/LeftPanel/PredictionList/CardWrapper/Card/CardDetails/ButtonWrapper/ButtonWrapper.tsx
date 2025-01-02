import "./ButtonWrapper.css";
import { RemoveButton } from "./RemoveButton/RemoveButton";
import { PredictButton } from "./PredictButton/PredictButton";
import { TagStatus } from "../../../../../../../types/tagstatus";

interface ButtonWrapperProps {
  fileName: string;
  status_list: TagStatus[];
}

export const ButtonWrapper = ({
  fileName,
  status_list,
}: ButtonWrapperProps): JSX.Element => {
  return (
    <div className="button-wrapper">
      <RemoveButton fileName={fileName} />
      <PredictButton fileName={fileName} status_list={status_list} />
    </div>
  );
};
