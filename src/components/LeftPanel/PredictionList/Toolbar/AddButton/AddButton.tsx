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
    const file = e.target.files?.[0];
    if (file) {
      try {
        const formData = new FormData();
        formData.append("video", file);

        const deviceId = getOrCreateDeviceId(); // Get the deviceId (either from cookie or generate a new one)
        formData.append("device_id", deviceId); // Add deviceId to FormData

        const response = await axios.post(
          config.connection_address + "/upload",
          formData
        );

        console.log(response.data.message);

        if (response.data.message === "Video uploaded successfully") {
          // Add the video to the cache
          const videoBlob = new Blob([file], { type: file.type }); // Convert the file to a Blob
          const videoCache = VideoBufferCache.getInstance(); // Access the singleton instance
          videoCache.addVideo(file.name, videoBlob); // Use the instance to add the video
          console.log(`Video ${file.name} added to the video buffer cache.`);
        }
      } catch (error) {
        console.error("Error uploading video:", error);
        alert("Error uploading video. Please try again.");
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
        onChange={handleFileChange}
      />
    </div>
  );
};
