import "./PredictButton.css";
import { Colors } from "../../../../../../../../styles/colors";
import { useState } from "react";
import { ExportCurve } from "iconsax-react";
import { getOrCreateDeviceId } from "../../../../../../../../utils/deviceIdUtils";
import axios from "axios";

interface PredictButtonProps {
  fileName: string;
}

export const PredictButton = ({
  fileName,
}: PredictButtonProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);
  const [, setIsLoading] = useState(false);

  const deviceId = getOrCreateDeviceId();

  const handleClick = async () => {
    setIsClicked(true);
    setIsLoading(true);

    console.log("Predict button clicked");

    const clientId = deviceId; // Use the deviceId as the client_id
    const url = `http://localhost:5000/process_video/${fileName}?device_id=${clientId}`;

    try {
      const response = await axios.get(url); // Send a GET request with axios
      console.log("Process video response:", response.data);
    } catch (error) {
      console.error("Error processing video:", error);
    } finally {
      setIsLoading(false); // Reset loading state after request is complete
    }
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
