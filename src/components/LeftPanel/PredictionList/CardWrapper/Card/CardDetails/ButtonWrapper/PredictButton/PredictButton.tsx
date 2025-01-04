import "./PredictButton.css";

import axios from "axios";
import { dotPulse } from "ldrs";
import { config } from "../../../../../../../../config/config";
import { Colors } from "../../../../../../../../styles/colors";
import { useState, useEffect } from "react";
import { ExportCurve, Clock, TickCircle } from "iconsax-react"; // Added Clock import
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
  const [isQueued, setIsQueued] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [isPredicted, setIsPredicted] = useState(false);
  const [, setLoading] = useState(false);

  const deviceId = getOrCreateDeviceId();

  useEffect(() => {
    if (status_list.some((status) => status === "queued")) {
      setIsQueued(true);
      setIsPredicting(false);
      setIsPredicted(false);
    } else {
      setIsQueued(false);
    }

    if (status_list.some((status) => status === "predicting")) {
      setIsQueued(false);
      setIsPredicting(true);
      setIsPredicted(false);
    } else {
      setIsPredicting(false);
    }

    if (status_list.some((status) => status === "complete")) {
      setIsQueued(false);
      setIsPredicting(false);
      setIsPredicted(true);
    } else {
      setIsPredicted(false);
    }
  }, [status_list]);

  const handleClick = async () => {
    setIsQueued(true);
    setLoading(true);

    console.log("Predict button clicked");

    const url = `${config.connection_address}/process_video/${fileName}?device_id=${deviceId}`;

    try {
      const response = await axios.get(url);
      console.log("Process video response:", response.data);
    } catch (error) {
      console.error("Error processing video:", error);
    } finally {
      setLoading(false);
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
      title="Begin/queue file for prediction"
      disabled={isQueued || isPredicting || isPredicted}
    >
      {getButtonIcon()}
      <div className="predict-button-text">{getButtonText()}</div>
    </button>
  );
};
