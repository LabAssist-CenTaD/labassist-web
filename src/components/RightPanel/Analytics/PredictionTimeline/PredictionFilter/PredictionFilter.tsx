import "./PredictionFilter.css";
import { InfoCircle, Danger, CloseCircle } from "iconsax-react";
import { PredictionFilterLabel } from "./PredictionFilterLabel/PredictionFilterLabel";
import Seperator from "../../../../../assets/seperator.svg";

export const PredictionFilter = (): JSX.Element => {
  return (
    <div className="prediciton-filter">
      <PredictionFilterLabel
        Icon={InfoCircle}
        label="Info"
        bg_color="rgba(0, 122, 255, 1)"
      />
      <img src={Seperator} alt="Seperator" className="seperator" />
      <PredictionFilterLabel
        Icon={Danger}
        label="Warning"
        bg_color="rgba(255, 209, 102, 1)"
      />
      <img src={Seperator} alt="Seperator" className="seperator" />
      <PredictionFilterLabel
        Icon={CloseCircle}
        label="Error"
        bg_color="rgba(239, 71, 111, 1)"
      />
    </div>
  );
};
