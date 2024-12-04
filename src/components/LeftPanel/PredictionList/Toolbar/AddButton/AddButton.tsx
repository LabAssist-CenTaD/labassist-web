import "./AddButton.css";
import axios from "axios";
import { useRef } from "react";
import { AddCircle } from "iconsax-react";
import { Colors } from "../../../../../styles/colors";
import { getOrCreateDeviceId } from "../../../../../utils/deviceIdUtils";
import { config } from "../../../../../config/config";

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

        // Get the deviceId (either from cookie or generate a new one)
        const deviceId = getOrCreateDeviceId();
        formData.append("device_id", deviceId); // Add deviceId to FormData

        const response = await axios.post(
          config.connection_address + "/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        console.log(response.data.message);
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
