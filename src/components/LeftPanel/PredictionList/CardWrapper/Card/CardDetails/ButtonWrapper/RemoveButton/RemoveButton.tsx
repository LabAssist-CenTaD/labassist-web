import { Trash } from "iconsax-react";
import "./RemoveButton.css";

export const RemoveButton = (): JSX.Element => {
  const handleClick = () => {
    console.log("Remove button clicked");
  };

  return (
    <button className="remove-button" onClick={handleClick}>
      <Trash size={16} variant="Bold" color="rgba(0, 23, 31, 1)" />
    </button>
  );
};
