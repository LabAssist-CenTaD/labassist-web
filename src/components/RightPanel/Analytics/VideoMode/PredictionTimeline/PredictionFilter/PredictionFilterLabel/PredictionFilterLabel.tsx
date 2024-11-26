import React, { useState } from "react";
import "./PredictionFilterLabel.css";

interface PredictionFilterLabelProps {
  Icon: React.ElementType;
  label: string;
  text_color?: string;
  bg_color: string;
  border?: string; // Optional prop to define border colour
}

export const PredictionFilterLabel = ({
  Icon,
  label,
  text_color,
  bg_color,
  border = "none", // Default border to none if not passed
}: PredictionFilterLabelProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false); // Track if mouse is clicked

  // Handle click event
  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log(
      "Filter label (",
      label,
      ") clicked, state is now: ",
      !isClicked
    );
  };

  return (
    <button
      className={`prediction-filter-label ${isClicked && "clicked"}`}
      style={
        {
          "--bg-color": bg_color,
          "--text-color": text_color || "var(--Blue-2)", // Default text color if not passed
          "--border": border,
        } as React.CSSProperties
      }
      onClick={handleClick}
      title={`Filter by "${label}"`}
    >
      <Icon
        size={12}
        variant="Bold"
        color={isClicked ? "var(--bg-color)" : "rgba(0, 33, 57, 1)"} // Change icon colour on mouse down
      />
      <div className="prediction-filter-label-text">{label}</div>
    </button>
  );
};
