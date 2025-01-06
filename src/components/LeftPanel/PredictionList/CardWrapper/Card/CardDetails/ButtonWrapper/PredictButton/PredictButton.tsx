import "./PredictButton.css";

import axios from "axios";
import { dotPulse } from "ldrs";
import { config } from "../../../../../../../../config/config";
import { Colors } from "../../../../../../../../styles/colors";
import { useState, useEffect } from "react";
import { ExportCurve, Clock, TickCircle } from "iconsax-react"; // Added Clock import
import { getOrCreateDeviceId } from "../../../../../../../../utils/deviceIdUtils";
import { TagStatus } from "../../../../../../../../types/tagstatus";
import { useCachedVideoContext } from "../../../../../../../../hooks/useCachedVideoContext";

dotPulse.register();

interface PredictButtonProps {
  fileName: string;
  status_list: TagStatus[];
}

export const PredictButton = ({
  fileName,
  status_list,
}: PredictButtonProps): JSX.Element => {
  const [isQueued, setIsQueued] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [, setLoading] = useState(false);

  const { cachedVideos, cachedVideoManager } = useCachedVideoContext();
  const deviceId = getOrCreateDeviceId();

  useEffect(() => {
    // Update the states based on the status list
    if (status_list.includes("complete")) {
      setIsQueued(false);
      setIsPredicting(false);
      setIsPredicted(true);
    } else if (status_list.includes("predicting")) {
      setIsQueued(false);
      setIsPredicting(true);
      setIsPredicted(false);
    } else if (status_list.includes("queued")) {
      setIsQueued(true);
      setIsPredicting(false);
      setIsPredicted(false);
    } else {
      setIsQueued(false);
    }

    setIsPredicting(
      cachedVideos.some(
        (video) =>
          video.file_name === fileName &&
          video.status_list.includes("predicting")
      )
    );
    setIsPredicted(
      cachedVideos.some(
        (video) =>
          video.file_name === fileName && video.status_list.includes("complete")
      )
    );
  }, [status_list, cachedVideos, fileName]); // Run whenever status_list changes

  const handleClick = async () => {
    if (!isQueued) {
      setIsQueued(true); // Set isQueued to true when button is clicked
      setLoading(true);

      try {
        // Replace the first tag (usually "uploaded") with "queued"
        const updatedStatusList = status_list.map((status, index) => {
          if (index === 0) {
            return "queued"; // Replace the first status with "queued"
          }
          return status;
        });

        // Ensure "queued" replaces the first tag, even if it's not exactly "uploaded"
        cachedVideoManager.updateStatusList(fileName, updatedStatusList);

        if (config.debug_level === 2)
          console.log("Patch emitted for status update.");

        // Make the API request to process the video
        const url = `${config.connection_address}/process_video/${fileName}?device_id=${deviceId}`;
        const response = await axios.get(url);
        if (config.debug_level === 1)
          console.log("Process video response:", response.data);
      } catch (error) {
        if (config.debug_errors)
          console.error("Error processing video or updating status:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  const getButtonClass = () => {
    if (isQueued) return "queued";
    if (isPredicting) return "predicting";
    if (isPredicted) return "predicted";
    return ""; // No class if none of the states are true
  };

  const getButtonText = () => {
    if (isPredicted) return "Predicted";
    if (isPredicting) return "Predicting";
    if (isQueued) return "Queued";
    return "Predict";
  };

  const getButtonIcon = () => {
    if (isQueued)
      return <Clock size={16} variant="Bold" color={Colors.blueGrey} />;
    if (isPredicting)
      return <l-dot-pulse size="16" speed="1.75" color={Colors.blue1} />;
    if (isPredicted)
      return <TickCircle size={16} variant="Bold" color={Colors.blueGrey} />;
    return <ExportCurve size={16} variant="Bold" color={Colors.blue2} />;
  };

  return (
    <button
      className={`predict-button ${getButtonClass()}`}
      onClick={handleClick}
      title="Begin/queue prediction"
      disabled={isQueued || isPredicting || isPredicted}
    >
      {getButtonIcon()}
      <div className="predict-button-text">{getButtonText()}</div>
    </button>
  );
};
