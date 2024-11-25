import { useState } from "react";
import { Note, VideoPlay } from "iconsax-react";
import "./AnalyticsHeader.css";

export const AnalyticsHeader = (): JSX.Element => {
  const [activeTab, setActiveTab] = useState<"video" | "summary">("video");

  const handleToggle = (tab: "video" | "summary") => {
    setActiveTab(tab);
  };

  return (
    <div className="analytics-header">
      <div className="analytics-title"><p>Analytics</p></div>
      <div className="video-summary-toggler">
        <div
          className={`toggle ${activeTab === "video" ? "active" : ""}`}
          onClick={() => handleToggle("video")}
        >
          <VideoPlay size={16} variant="Bold" color="rgba(201, 232, 255, 1)" />
          <div className="toggle-text">Video</div>
        </div>
        <div
          className={`toggle ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => handleToggle("summary")}
        >
          <Note size={16} variant="Bold" color="rgba(201, 232, 255, 1)" />
          <div className="toggle-text">Summary</div>
        </div>
      </div>
    </div>
  );
};
