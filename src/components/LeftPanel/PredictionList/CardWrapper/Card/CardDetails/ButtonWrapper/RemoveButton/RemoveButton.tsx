import { Trash } from "iconsax-react";
import "./RemoveButton.css";
import { Colors } from "../../../../../../../../styles/colors";

export const RemoveButton = (): JSX.Element => {
  const handleClick = () => {
    console.log("Remove button clicked");
  };

  return (
    <button className="remove-button" onClick={handleClick} title="Remove file">
      <Trash size={16} variant="Bold" color={Colors.background} />
    </button>
  );
};
