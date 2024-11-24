import "./ButtonWrapper.css";
import { RemoveButton } from "./RemoveButton/RemoveButton";
import { PredictButton } from "./PredictButton/PredictButton";

export const ButtonWrapper = (): JSX.Element => {
  return (
    <div className="button-wrapper">
      <RemoveButton />
      <PredictButton />
    </div>
  );
};
