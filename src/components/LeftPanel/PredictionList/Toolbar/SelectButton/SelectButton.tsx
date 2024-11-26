import { useState } from "react";
import { TickCircle, LogoutCurve } from "iconsax-react"; // Import both icons
import "./SelectButton.css";
import { Colors } from "../../../../../styles/colors";

export const SelectButton = (): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false); // Track if mouse is clicked

  // Handle click event
  const handleClick = () => {
    setIsClicked(!isClicked);
    console.log("Select button clicked, state is now: ", !isClicked);
  };

  return (
    <button
      className={`select-button ${isClicked && "clicked"}`}
      onClick={handleClick}
      title="Select files"
    >
      {isClicked ? (
        <LogoutCurve size={16} variant="Bold" color={Colors.foreground} />
      ) : (
        <TickCircle size={16} variant="Bold" color={Colors.background} />
      )}
      <div className="select-button-text">
        {isClicked ? "Cancel" : "Select"} {/* Change text based on isClicked */}
      </div>
    </button>
  );
};
