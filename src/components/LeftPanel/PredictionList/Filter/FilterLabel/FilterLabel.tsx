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
      className={`filter-label ${isClicked && "clicked"}`}
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
        color={isClicked ? "var(--bg-color)" : "var(--blue-2)"} // Change icon colour on mouse down
      />
      <div className="filter-label-text">{label}</div>
    </button>
  );
};
