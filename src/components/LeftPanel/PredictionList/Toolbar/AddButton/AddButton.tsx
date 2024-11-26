import { AddCircle } from "iconsax-react";
import "./AddButton.css";
import { Colors } from "../../../../../styles/colors";

export const AddButton = (): JSX.Element => {
  const handleClick = () => {
    console.log("Add button clicked");
  };

  return (
    <button className="add-button" onClick={handleClick} title="Add files">
      <AddCircle size={16} variant="Bold" color={Colors.background} />
    </button>
  );
};
