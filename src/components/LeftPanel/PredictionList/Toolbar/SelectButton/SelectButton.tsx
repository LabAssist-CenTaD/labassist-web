import { useState } from "react";
import { TickCircle } from "iconsax-react";
import "./SelectButton.css";

export const SelectButton = (): JSX.Element => {
  const [isPressed, setIsPressed] = useState(false);

  const handleMouseDown = () => setIsPressed(true);
  const handleMouseUp = () => setIsPressed(false);

  return (
    <button
      className="select-button"
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    >
      <TickCircle
        size={16}
        variant="Bold"
        color={isPressed ? "rgba(201, 232, 255, 1)" : "rgba(0, 23, 31, 1)"}
      />
      <div className="text-wrapper">Select</div>
    </button>
  );
};
