// import React from "react";
import React from "react";
import "./Button40.css";

interface Button40Props {
  Icon: React.ElementType; // Allows passing any React component as a prop
  iconProps?: {
    size?: number;
    variant?: string;
    color?: string;
  }; // Optional props for the icon
}

export const Button40 = ({ Icon, iconProps }: Button40Props): JSX.Element => {
  return (
    <button className="button-40">
      <Icon
        size={16}
        variant="Bold"
        color="rgba(0, 23, 31, 1)"
        {...iconProps}
      />
    </button>
  );
};
