import "./PredictButton.css";

import axios from "axios";
import { dotPulse } from "ldrs";
import { Colors } from "../../../../../../../../styles/colors";
import { useState, useEffect } from "react";
import { ExportCurve, TickCircle } from "iconsax-react";
import { getOrCreateDeviceId } from "../../../../../../../../utils/deviceIdUtils";
import { TagStatus } from "../../../../../../../../types/tagstatus";

dotPulse.register();

interface PredictButtonProps {
  fileName: string;
  status_list: TagStatus[];
}

export const PredictButton = ({
  fileName,
  status_list,
}: PredictButtonProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false); // default to false as it's not predicting initially
  const [isPredicted, setIsPredicted] = useState(false);
  const [, setIsLoading] = useState(false);

  const deviceId = getOrCreateDeviceId();

  // Set `isClicked` to true if `status_list` contains any of the specified statuses
  useEffect(() => {
    if (status_list.some((status) => ["queued"].includes(status))) {
      setIsClicked(true);
    }
  }, [status_list]);

  useEffect(() => {
    if (status_list.some((status) => ["predicting"].includes(status))) {
      setIsPredicting(true);
      setIsPredicted(false); // Reset to false while predicting
    } else {
      setIsPredicting(false);
    }
  }, [status_list]);

  useEffect(() => {
    if (status_list.some((status) => ["complete"].includes(status))) {
      setIsPredicted(true);
      setIsPredicting(false); // Stop predicting once completed
    } else {
      setIsPredicted(false);
    }
  }, [status_list]);

  const handleClick = async () => {
    setIsClicked(true);
    setIsLoading(true);

    console.log("Predict button clicked");

    const url = `http://localhost:5000/process_video/${fileName}?device_id=${deviceId}`;

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
      className={`predict-button ${isClicked ? "clicked" : ""} ${
        isPredicting ? "predicting" : ""
      } ${isPredicted ? "predicted" : ""}`}
      onClick={handleClick}
      title="Begin/queue file for prediction"
      disabled={isClicked || isPredicted} // Disable the button once predicted
    >
      {isClicked && isPredicting ? (
        <l-dot-pulse size="16" speed="1.75" color={Colors.blue1} />
      ) : isClicked && isPredicted ? (
        <TickCircle size={16} variant="Bold" color={Colors.blueGrey} /> // TickCircle when predicted
      ) : (
        <ExportCurve size={16} variant="Bold" color={Colors.blueGrey} />
      )}
      <div className="predict-button-text">
        {isPredicted ? "Predicted" : isPredicting ? "Predicting" : "Predict"}
      </div>
    </button>
  );
};
