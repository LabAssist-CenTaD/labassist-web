import { useState } from "react";
import { TickCircle } from "iconsax-react";
import "./SelectButton.css";

export const SelectButton = (): JSX.Element => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      className="select-button"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <TickCircle
        size={16}
        variant="Bold"
        color={isHovered ? "rgba(201, 232, 255, 1)" : "rgba(0, 23, 31, 1)"}
      />
      <div className="text-wrapper">Select</div>
    </button>
  );
};
