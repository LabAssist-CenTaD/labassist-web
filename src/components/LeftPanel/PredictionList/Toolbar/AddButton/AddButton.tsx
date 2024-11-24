import { AddCircle } from "iconsax-react";
import "./AddButton.css";

export const AddButton = (): JSX.Element => {
  const handleClick = () => {
    console.log("Add button clicked");
  };

  return (
    <button className="add-button" onClick={handleClick} title="Add files">
      <AddCircle size={16} variant="Bold" color="rgba(0, 23, 31, 1)" />
    </button>
  );
};
