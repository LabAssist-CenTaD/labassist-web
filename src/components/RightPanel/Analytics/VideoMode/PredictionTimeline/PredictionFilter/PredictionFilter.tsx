import "./PredictionFilter.css";
import { InfoCircle, Danger, CloseCircle } from "iconsax-react";
import { PredictionFilterLabel } from "./PredictionFilterLabel/PredictionFilterLabel";
import FilterSeperator from "../../../../../../assets/filter-seperator.svg";
import { Colors } from "../../../../../../styles/colors";

export const PredictionFilter = (): JSX.Element => {
  return (
    <div className="prediciton-filter">
      <PredictionFilterLabel
        Icon={InfoCircle}
        label="Info"
        bg_color={Colors.blue1}
      />
      <img
        src={FilterSeperator}
        alt="Filter Seperator"
        className="filter-seperator"
      />
      <PredictionFilterLabel
        Icon={Danger}
        label="Warning"
        bg_color={Colors.yellow}
      />
      <img
        src={FilterSeperator}
        alt="Filter Seperator"
        className="filter-seperator"
      />
      <PredictionFilterLabel
        Icon={CloseCircle}
        label="Error"
        bg_color={Colors.red}
      />
    </div>
  );
};
