import "./AddButton.css";
import { AddCircle } from "iconsax-react";
import { Colors } from "../../../../../styles/colors";
import { useRef } from "react";
import axios from "axios";

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

        const response = await axios.post(
          "http://localhost:5000/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        alert(response.data.message);
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
