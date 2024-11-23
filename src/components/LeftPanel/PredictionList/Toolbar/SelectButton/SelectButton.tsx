// import React from "react";
import { TickCircle } from "iconsax-react";
import "./SelectButton.css";

export const SelectButton = (): JSX.Element => {
  return (
    <div className="select-button">
      <TickCircle size={16} variant="Bold" color="rgba(0, 23, 31, 1)" />
      <div className="text-wrapper">Select</div>
    </div>
  );
};
