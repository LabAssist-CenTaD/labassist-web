import React, { useState } from "react";
import "./Button40.css";

interface Button40Props {
  Icon: React.ElementType; // Allows passing any React component as a prop
  iconProps?: {
    size?: number;
    variant?: string;
    color?: string;
  }; // Optional props for the icon
}

export const Button40 = ({ Icon, iconProps }: Button40Props): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false); // Track if mouse is pressed

  // Handle mouse down and up events
  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  const [isClicked, setIsClicked] = useState(false); // Track if mouse is clicked

  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log("Button clicked");
  };

  return (
    <button
      className="button-40"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      <Icon
        size={16}
        variant="Bold"
        color={isPressed ? "rgba(0, 122, 255, 1)" : "rgba(0, 23, 31, 1)"}
        className="button-40-icon"
        {...iconProps}
      />
    </button>
  );
};
