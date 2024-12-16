import "./RemoveButton.css";

import axios from "axios";
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
    console.log("Remove button clicked, removing ", fileName);

    const url = `http://localhost:5000/delete/${fileName}?device_id=${deviceId}`;

    try {
      const response = await axios.get(url); // Send a GET request with axios
      console.log("Delete video response:", response.data);

      if (response.data?.message === "Video deleted successfully") {
        videoCache.removeVideo(fileName);
        // console.log(videoCache.isCached(fileName));
      }
    } catch (error) {
      console.error("Error removing video:", error);
    }
  };

  return (
    <button className="remove-button" onClick={handleClick} title="Remove file">
      <Trash size={16} variant="Bold" color={Colors.background} />
    </button>
  );
};
