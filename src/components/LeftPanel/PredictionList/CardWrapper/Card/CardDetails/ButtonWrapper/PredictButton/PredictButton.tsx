import "./PredictButton.css";

import axios from "axios";
import { Colors } from "../../../../../../../../styles/colors";
import { useState, useEffect } from "react";
import { ExportCurve } from "iconsax-react";
import { getOrCreateDeviceId } from "../../../../../../../../utils/deviceIdUtils";
import { TagStatus } from "../../../StatusBar/TagWrapper/Tag/Tag";

interface PredictButtonProps {
  fileName: string;
  status_list: TagStatus[];
}

export const PredictButton = ({
  fileName,
  status_list,
}: PredictButtonProps): JSX.Element => {
  const [isClicked, setIsClicked] = useState(false);
  const [, setIsLoading] = useState(false);

  const deviceId = getOrCreateDeviceId();

  // Set `isClicked` to true if `status_list` contains any of the specified statuses
  useEffect(() => {
    if (
      status_list.some((status) =>
        ["complete", "predicting", "queued"].includes(status)
      )
    ) {
      setIsClicked(true);
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
      className={`predict-button ${isClicked ? "clicked" : ""}`}
      onClick={handleClick}
      title="Begin/queue file for prediction"
      disabled={isClicked}
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
