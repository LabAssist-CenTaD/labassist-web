import "./ButtonWrapper.css";
import { RemoveButton } from "./RemoveButton/RemoveButton";
import { PredictButton } from "./PredictButton/PredictButton";

interface ButtonWrapperProps {
  fileName: string;
}

export const ButtonWrapper = ({
  fileName,
}: ButtonWrapperProps): JSX.Element => {
  return (
    <div className="button-wrapper">
      <RemoveButton />
      <PredictButton fileName={fileName} />
    </div>
  );
};
