import { useState } from "react";
import { ExportCurve } from "iconsax-react";
import "./PredictButton.css";
import { Colors } from "../../../../../../../../styles/colors";

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
      title="Begin/queue file for prediction"
    >
      {isClicked ? (
        <ExportCurve size={16} variant="Bold" color={Colors.blueGrey} />
      ) : (
        <ExportCurve size={16} variant="Bold" color={Colors.blue2} />
      )}
      <div className="predict-button-text">Predict</div>
    </button>
  );
};
