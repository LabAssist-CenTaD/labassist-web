import "./Filter.css";

import {
  CloseCircle,
  Danger,
  Star,
  TickCircle,
  Timer,
  VideoTick,
} from "iconsax-react";
import { FilterLabel } from "./FilterLabel/FilterLabel";
import { Colors } from "../../../../styles/colors";
import { PredictionListFilterLabelName } from "../../../../types/filterlabel";

interface FilterProps {
  activeLabels: PredictionListFilterLabelName[];
  setActiveLabels: React.Dispatch<
    React.SetStateAction<PredictionListFilterLabelName[]>
  >;
}

export const Filter = ({
  activeLabels,
  setActiveLabels,
}: FilterProps): JSX.Element => {
  const handleToggle = (
    label: PredictionListFilterLabelName,
    isActive: boolean
  ) => {
    setActiveLabels((prev) => {
      if (prev.length === 6) {
        return [label]; // Activate only the clicked label
      } else if (prev.length === 1 && prev.includes(label)) {
        return [
          "perfect",
          "warnings-present",
          "errors-present",
          "complete",
          "predicting",
          "uploaded",
        ]; // Activate all labels
      }
      return isActive ? [...prev, label] : prev.filter((l) => l !== label);
    });
  };

  return (
    <div className="filter">
      <div className="wrapper">
        <FilterLabel
          Icon={Star}
          label="perfect"
          bg_color={Colors.green}
          isActive={activeLabels.includes("perfect")}
          onToggle={handleToggle}
        />
        <FilterLabel
          Icon={Danger}
          label="warnings-present"
          bg_color={Colors.yellow}
          isActive={activeLabels.includes("warnings-present")}
          onToggle={handleToggle}
        />
        <FilterLabel
          Icon={CloseCircle}
          label="errors-present"
          bg_color={Colors.red}
          isActive={activeLabels.includes("errors-present")}
          onToggle={handleToggle}
        />
      </div>
      <div className="wrapper">
        <FilterLabel
          Icon={TickCircle}
          label="complete"
          bg_color={Colors.blue1}
          isActive={activeLabels.includes("complete")}
          onToggle={handleToggle}
        />
        <FilterLabel
          Icon={Timer}
          label="predicting"
          bg_color={Colors.foreground}
          isActive={activeLabels.includes("predicting")}
          onToggle={handleToggle}
        />
        <FilterLabel
          Icon={VideoTick}
          label="uploaded"
          bg_color={Colors.blueGrey}
          isActive={activeLabels.includes("uploaded")}
          onToggle={handleToggle}
        />
      </div>
    </div>
  );
};
