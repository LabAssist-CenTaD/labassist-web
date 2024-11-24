import { Trash } from "iconsax-react";
import "./RemoveButton.css";

export const RemoveButton = (): JSX.Element => {
  return (
    <button className="remove-button">
      <Trash size={16} variant="Bold" color="rgba(0, 23, 31, 1)" />
    </button>
  );
};
