import "./PredictionFilter.css";

import FilterSeperator from "../../../../../../assets/filter-seperator.svg";
import { InfoCircle, Danger, CloseCircle } from "iconsax-react";
import { PredictionFilterLabel } from "./PredictionFilterLabel/PredictionFilterLabel";
import { Colors } from "../../../../../../styles/colors";
import { PredictionTimelineFilterLabel } from "../../../../../../types/filterlabel";

interface PredictionFilterProps {
  activeLabels: PredictionTimelineFilterLabel[];
  setActiveLabels: React.Dispatch<
    React.SetStateAction<PredictionTimelineFilterLabel[]>
  >;
}

export const PredictionFilter = ({
  activeLabels,
  setActiveLabels,
}: PredictionFilterProps): JSX.Element => {
  const handleToggle = (
    label: PredictionTimelineFilterLabel,
    isActive: boolean
  ) => {
    setActiveLabels((prev) => {
      if (isActive) {
        // Add the label to the active list if it's not already there
        return [...prev, label];
      } else {
        // Remove the label from the active list
        return prev.filter((l) => l !== label);
      }
    });
  };
  
  // console.log("PredictionFilter activeLabels: ", activeLabels);

  return (
    <div className="prediciton-filter">
      <PredictionFilterLabel
        Icon={InfoCircle}
        label="info"
        bg_color={Colors.blue1}
        isActive={activeLabels.includes("info")}
        onToggle={handleToggle}
      />
      <img
        src={FilterSeperator}
        alt="Filter Seperator"
        className="filter-seperator"
      />
      <PredictionFilterLabel
        Icon={Danger}
        label="warning"
        bg_color={Colors.yellow}
        isActive={activeLabels.includes("warning")}
        onToggle={handleToggle}
      />
      <img
        src={FilterSeperator}
        alt="Filter Seperator"
        className="filter-seperator"
      />
      <PredictionFilterLabel
        Icon={CloseCircle}
        label="error"
        bg_color={Colors.red}
        isActive={activeLabels.includes("error")}
        onToggle={handleToggle}
      />
    </div>
  );
};
