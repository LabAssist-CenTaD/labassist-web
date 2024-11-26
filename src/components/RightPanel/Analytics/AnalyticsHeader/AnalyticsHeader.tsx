import { Note, VideoPlay } from "iconsax-react";
import "./AnalyticsHeader.css";
import { Colors } from "../../../../styles/colors";

interface AnalyticsHeaderProps {
  activeTab: "video" | "summary";
  onToggle: (tab: "video" | "summary") => void;
}

export const AnalyticsHeader = ({
  activeTab,
  onToggle,
}: AnalyticsHeaderProps): JSX.Element => {
  return (
    <div className="analytics-header">
      <div className="analytics-title">
        <p>Analytics</p>
      </div>
      <div className="video-summary-toggler">
        <div
          className={`toggle ${activeTab === "video" ? "active" : ""}`}
          onClick={() => onToggle("video")}
        >
          <VideoPlay size={16} variant="Bold" color={Colors.foreground} />
          <div className="toggle-text">Video</div>
        </div>
        <div
          className={`toggle ${activeTab === "summary" ? "active" : ""}`}
          onClick={() => onToggle("summary")}
        >
          <Note size={16} variant="Bold" color={Colors.foreground} />
          <div className="toggle-text">Summary</div>
        </div>
      </div>
    </div>
  );
};
