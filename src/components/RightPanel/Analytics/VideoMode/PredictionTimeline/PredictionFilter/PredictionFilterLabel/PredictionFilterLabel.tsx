import "./PredictionFilterLabel.css";

import { PredictionTimelineFilterLabel } from "../../../../../../../types/filterlabel";
import { toTitleCase } from "../../../../../../../utils/stringUtils";

interface PredictionFilterLabelProps {
  Icon: React.ElementType;
  label: PredictionTimelineFilterLabel;
  text_color?: string;
  bg_color: string;
  border?: string; // Optional prop to define border colour

  isActive: boolean; // New prop to determine if the label is active
  onToggle: (label: PredictionTimelineFilterLabel, isActive: boolean) => void; // Callback for toggling
}

export const PredictionFilterLabel = ({
  Icon,
  label,
  text_color,
  bg_color,
  border = "none", // Default border to none if not passed
  isActive,
  onToggle,
}: PredictionFilterLabelProps): JSX.Element => {
  // Handle click event
  const handleClick = () => {
    onToggle(label, !isActive); // Call the parent's onToggle function
    // console.log("Filter label (", label, ") clicked, state is now: ", !isActive);
  };

  return (
    <button
      className={`prediction-filter-label ${!isActive && "clicked"}`}
      style={
        {
          "--bg-color": bg_color,
          "--text-color": text_color || "var(--Blue-2)", // Default text color if not passed
          "--border": border,
        } as React.CSSProperties
      }
      onClick={handleClick}
      title={`Filter by "${toTitleCase(label)}"`}
    >
      <Icon
        size={12}
        variant="Bold"
        color={!isActive ? "var(--bg-color)" : "var(--blue-2)"} // Change icon colour on mouse down
      />
      <div className="prediction-filter-label-text">{toTitleCase(label)}</div>
    </button>
  );
};
