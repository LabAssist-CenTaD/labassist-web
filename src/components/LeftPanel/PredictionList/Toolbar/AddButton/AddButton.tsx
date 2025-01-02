import "./AddButton.css";

import axios from "axios";
import { useRef } from "react";
import { AddCircle } from "iconsax-react";
import { config } from "../../../../../config/config";
import { Colors } from "../../../../../styles/colors";
import { getOrCreateDeviceId } from "../../../../../utils/deviceIdUtils";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";

export const AddButton = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input
    }
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const deviceId = getOrCreateDeviceId();
      const videoBufferCache = VideoBufferCache.getInstance();

      for (const file of files) { // Iterate over the selected files
        try {
          const formData = new FormData();
          formData.append("video", file);
          formData.append("device_id", deviceId);

          const response = await axios.post(
            `${config.connection_address}/upload`,
            formData
          );

          console.log(`Response for ${file.name}:`, response.data.message);

          if (response.data.message === "Video uploaded successfully") {
            // Add the video to the cache
            const videoBlob = new Blob([file], { type: file.type }); // Convert the file to a Blob
            const fileName = file.name
              .replace(/\s+/g, "_")
              .replace(/[()]/g, "");
            videoBufferCache.addVideo(fileName, videoBlob);

            console.log(`Video ${fileName} added to VBCache.`);
          }
        } catch (error) {
          console.error(`Error uploading ${file.name}:`, error);
          alert(`Error uploading ${file.name}. Please try again.`);
        }
      }

      // Reset the file input value to allow re-uploading the same files if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };

  return (
    <div>
      <button className="add-button" onClick={handleClick} title="Add files">
        <AddCircle size={16} variant="Bold" color={Colors.background} />
      </button>

      {/* Invisible file input triggered by button click */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the input
        accept="video/*" // Restrict file types to video files
        multiple // Enable multiple file selection
        onChange={handleFileChange}
      />
    </div>
  );
};
