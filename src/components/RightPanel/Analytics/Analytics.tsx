import { useState } from "react";
import "./Analytics.css";
import { AnalyticsHeader } from "./AnalyticsHeader/AnalyticsHeader";
import { VideoMode } from "./VideoMode/VideoMode";
import { SummaryMode } from "./SummaryMode/SummaryMode";

export const Analytics = (): JSX.Element => {
  // Keep track of actve tab
  const [activeTab, setActiveTab] = useState<"video" | "summary">("video");

  const handleToggle = (tab: "video" | "summary") => {
    setActiveTab(tab);
  };

  return (
    <div className="analytics">
      <AnalyticsHeader activeTab={activeTab} onToggle={handleToggle} />
      {activeTab === "video" ? <VideoMode /> : <SummaryMode />}
    </div>
  );
};
