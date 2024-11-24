import { useState } from "react";
import { ExportCurve } from "iconsax-react";
import "./PredictButton.css";

export const PredictButton = (): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    console.log("Predict button clicked");
  };

  return (
    <button
      className={`predict-button ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
    >
      {isClicked ? (
        <ExportCurve size={16} variant="Bold" color="rgba(98, 120, 136, 1)" />
      ) : (
        <ExportCurve size={16} variant="Bold" color="rgba(0, 33, 57, 1)" />
      )}
      <div className="predict-button-text">Predict</div>
    </button>
  );
};
