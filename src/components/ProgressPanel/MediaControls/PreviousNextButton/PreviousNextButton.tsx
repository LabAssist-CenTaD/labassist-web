import "./PreviousNextButton.css";

import { Backward, Forward } from "iconsax-react";
import { Colors } from "../../../../styles/colors";

interface PreviousNextButtonProps {
  type: "previous" | "next";
}

export const PreviousNextButton = ({
  type,
}: PreviousNextButtonProps): JSX.Element => {
  return (
    <button className="previous-next-button">
      {type === "previous" ? (
        <Backward size={16} variant="Bold" color={Colors.background}></Backward>
      ) : (
        <Forward size={16} variant="Bold" color={Colors.background}></Forward>
      )}
    </button>
  );
};
