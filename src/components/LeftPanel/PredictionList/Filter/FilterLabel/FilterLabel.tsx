import "./FilterLabel.css";

import React from "react";
import { PredictionListFilterLabelName } from "../../../../../types/filterlabel";
import { toTitleCase } from "../../../../../utils/stringUtils";
import { config } from "../../../../../config/config";

interface FilterLabelProps {
  Icon: React.ElementType;
  label: PredictionListFilterLabelName;
  text_color?: string;
  bg_color: string;
  border?: string; // Optional prop to define border colour

  isActive: boolean; // New prop to determine if the label is active
  onToggle: (label: PredictionListFilterLabelName, isActive: boolean) => void; // Callback for toggling
}

export const FilterLabel = ({
  Icon,
  label,
  text_color,
  bg_color,
  border = "none", // Default border to none if not passed
  isActive,
  onToggle,
}: FilterLabelProps): JSX.Element => {
  const handleClick = () => {
    onToggle(label, !isActive); // Call the parent's onToggle function
    if (config.debug_level === 2)
      console.log(
        "Filter label (",
        label,
        ") clicked, state is now: ",
        !isActive
      );
  };

  return (
    <button
      className={`filter-label ${!isActive && "clicked"}`}
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
      <div className="filter-label-text">{toTitleCase(label)}</div>
    </button>
  );
};
