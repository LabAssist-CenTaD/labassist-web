import "./RemoveButton.css";

import axios from "axios";
import { config } from "../../../../../../../../config/config";
import { Trash } from "iconsax-react";
import { Colors } from "../../../../../../../../styles/colors";
import { getOrCreateDeviceId } from "../../../../../../../../utils/deviceIdUtils";
import { VideoBufferCache } from "../../../../../../../../managers/VideoBufferCacheManager";
interface RemoveButtonProps {
  fileName: string;
}

export const RemoveButton = ({ fileName }: RemoveButtonProps): JSX.Element => {
  const deviceId = getOrCreateDeviceId();
  const videoCache = VideoBufferCache.getInstance();

  const handleClick = async () => {
    if (config.debug_level === 1)
      console.log("Remove button clicked, removing ", fileName);

    const url = `${config.connection_address}/delete/${fileName}?device_id=${deviceId}`;

    try {
      const response = await axios.get(url); // Send a GET request with axios
      if (config.debug_level === 1)
        console.log("Delete video response:", response.data);

      if (response.data?.message === "Video deleted successfully") {
        videoCache.removeVideo(fileName);

        if (config.debug_level === 2)
          console.log(
            `Checking if ${fileName} is cached: ${videoCache.isCached(
              fileName
            )}`
          );
      }
    } catch (error) {
      if (config.debug_errors) console.error("Error removing video:", error);
    }
  };

  return (
    <button className="remove-button" onClick={handleClick} title="Remove file">
      <Trash size={16} variant="Bold" color={Colors.background} />
    </button>
  );
};
