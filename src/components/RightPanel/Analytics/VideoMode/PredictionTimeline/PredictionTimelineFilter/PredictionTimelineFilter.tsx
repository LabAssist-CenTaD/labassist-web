import "./PredictionTimelineFilter.css";

import FilterSeperator from "../../../../../../assets/filter-seperator.svg";
import { InfoCircle, Danger, CloseCircle } from "iconsax-react";
import { PredictionTimelineFilterLabel } from "./PredictionTimelineFilterLabel/PredictionTimelineFilterLabel";
import { Colors } from "../../../../../../styles/colors";
import { PredictionTimelineFilterLabelName } from "../../../../../../types/filterlabel";

interface PredictionTimelineFilterProps {
  activeLabels: PredictionTimelineFilterLabelName[];
  setActiveLabels: React.Dispatch<
    React.SetStateAction<PredictionTimelineFilterLabelName[]>
  >;
}

export const PredictionTimelineFilter = ({
  activeLabels,
  setActiveLabels,
}: PredictionTimelineFilterProps): JSX.Element => {
  const handleToggle = (
    label: PredictionTimelineFilterLabelName,
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

  // console.log("PredictionTimelineFilter activeLabels: ", activeLabels);

  return (
    <div className="prediciton-filter">
      <PredictionTimelineFilterLabel
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
      <PredictionTimelineFilterLabel
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
      <PredictionTimelineFilterLabel
        Icon={CloseCircle}
        label="error"
        bg_color={Colors.red}
        isActive={activeLabels.includes("error")}
        onToggle={handleToggle}
      />
    </div>
  );
};
