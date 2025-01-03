import "./SelectButton.css";

import { TickCircle, LogoutCurve } from "iconsax-react"; // Import both icons
import { Colors } from "../../../../../styles/colors";

interface SelectButtonProps {
  onToggle: () => void;
  isInSelectMode: boolean;
}

export const SelectButton = ({
  onToggle,
  isInSelectMode,
}: SelectButtonProps): JSX.Element => {
  // Handle click event
  const handleClick = () => {
    onToggle(); // Call onToggle to update state in parent
    console.log("Select button clicked, state is now: ", !isInSelectMode);
  };

  return (
    <button
      className={`select-button ${isInSelectMode && "clicked"}`}
      onClick={handleClick}
      title="Select files"
    >
      {isInSelectMode ? (
        <LogoutCurve size={16} variant="Bold" color={Colors.foreground} />
      ) : (
        <TickCircle size={16} variant="Bold" color={Colors.background} />
      )}
      <div className="select-button-text">
        {isInSelectMode ? "Cancel" : "Select"}{" "}
        {/* Change text based on isClicked */}
      </div>
    </button>
  );
};
