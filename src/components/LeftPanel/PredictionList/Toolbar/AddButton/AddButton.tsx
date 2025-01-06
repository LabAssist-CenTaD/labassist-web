import "./AddButton.css";

import axios from "axios";
import { useRef, useState } from "react";
import { AddCircle } from "iconsax-react";
import { orbit } from "ldrs";
import { config } from "../../../../../config/config";
import { Colors } from "../../../../../styles/colors";
import { getOrCreateDeviceId } from "../../../../../utils/deviceIdUtils";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";

orbit.register();

export const AddButton = (): JSX.Element => {
  const fileInputRef = useRef<HTMLInputElement>(null); // Reference to the file input

  // New state variables for tracking upload status
  const [isUploading, setIsUploading] = useState(false);
  const [filesUploading, setFilesUploading] = useState(0);

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

      // Set uploading state
      setIsUploading(true);
      setFilesUploading(files.length); // Set the number of files being uploaded

      // Iterate over the selected files
      for (const file of files) {
        try {
          const formData = new FormData();
          formData.append("video", file);
          formData.append("device_id", deviceId);

          const response = await axios.post(
            `${config.connection_address}/upload`,
            formData
          );
          if (config.debug_level === 1)
            console.log(`Response for ${file.name}:`, response.data.message);

          if (response.data.message === "Video uploaded successfully") {
            // Add the video to the cache
            const videoBlob = new Blob([file], { type: file.type }); // Convert the file to a Blob
            const fileName = file.name
              .replace(/\s+/g, "_")
              .replace(/[()]/g, "");
            videoBufferCache.addVideo(fileName, videoBlob);

            if (config.debug_level === 1)
              console.log(`Video ${fileName} added to VBCache.`);
          }
        } catch (error) {
          if (config.debug_errors)
            console.error(`Error uploading ${file.name}:`, error);
          alert(`Error uploading ${file.name}. Please try again.`);
        }

        // Decrement the filesUploading count after each file upload
        setFilesUploading((prevCount) => prevCount - 1);
      }

      // Reset the file input value to allow re-uploading the same files if needed
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Set uploading state to false when all files are uploaded
      setIsUploading(false);
    }
  };

  return (
    <div>
      <button
        className={`add-button ${isUploading ? "uploading" : "not-uploading"}`}
        onClick={handleClick}
        title={
          isUploading ? `Uploading ${filesUploading} file(s)` : "Add files"
        }
        disabled={isUploading} // Disable the button while uploading
      >
        {isUploading ? (
          <>
            <l-orbit size={16} speed={1.5} color={Colors.background}></l-orbit>
            <div className="uploading-text">{filesUploading}</div>
          </>
        ) : (
          <AddCircle size={16} variant="Bold" color={Colors.background} />
        )}
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
