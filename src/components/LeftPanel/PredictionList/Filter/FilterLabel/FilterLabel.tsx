import React, { useState } from "react";
import "./FilterLabel.css";

interface FilterLabelProps {
  Icon: React.ElementType;
  label: string;
  text_color?: string;
  bg_color: string;
  border?: string; // Optional prop to define border colour
}

export const FilterLabel = ({
  Icon,
  label,
  text_color,
  bg_color,
  border = "none", // Default border to none if not passed
}: FilterLabelProps): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false); // Track if mouse is pressed

  // Handle mouse down and up events
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      className="filter-label"
      style={
        {
          "--bg-color": bg_color,
          "--text-color": text_color || "var(--Blue-2)", // Default text color if not passed
          "--border": border,
        } as React.CSSProperties
      }
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <Icon
        size={12}
        variant="Bold"
        color={isPressed ? "var(--bg-color)" : "rgba(0, 33, 57, 1)"} // Change icon colour on mouse down
      />
      <div className="filter-label-text">{label}</div>
    </button>
  );
};
