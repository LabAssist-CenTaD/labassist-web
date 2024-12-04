import "./PredictionList.css";

import { useEffect, useState } from "react";
import { CardWrapper } from "./CardWrapper/CardWrapper";
import { Toolbar } from "./Toolbar/Toolbar";
import { Filter } from "./Filter/Filter";
import { useCachedVideoContext } from "../../../hooks/useCachedVideoContext";

export const PredictionList = (): JSX.Element => {
  const { cachedVideoManager, cachedVideos } = useCachedVideoContext(); // Use context to get cachedVideoManager
  const [searchQuery, setSearchQuery] = useState("");

  const [fileData, setFileData] = useState(
    cachedVideoManager.getCachedVideos()
  );
  const [loading, setLoading] = useState(true);

  // Update fileData when cachedVideoManager is updated
  useEffect(() => {
    const fetchData = async () => {
      const updatedData = cachedVideoManager.getCachedVideos();
      const jsonMessage = cachedVideoManager.getMessage();
      if (jsonMessage) {
        setFileData(updatedData); // Trigger re-render by updating fileData state
        setLoading(false);
      }
    };

    fetchData();

    // const updateHandler = () => {
    //   fetchData(); // Re-fetch data on every update
    // };

    // cachedVideoManager.addChangeListener(updateHandler); // Listen to changes in cachedVideoManager

    // return () => {
    //   cachedVideoManager.removeChangeListener(updateHandler); // Clean up listener
    // };
  }, [cachedVideoManager, cachedVideos]); // Depend on cachedVideoManager to re-trigger effect on changes

  // Filter the file data based on the search query
  const filteredFileData = fileData.filter((file) => {
    const fileNameWithoutExtension = file.file_name
      .replace(/\.(mp4|mov|avi)$/, "")
      .toLowerCase();
    const searchQueryLowerCase = searchQuery.toLowerCase();

    return fileNameWithoutExtension.includes(searchQueryLowerCase);
  });

  const handleSearch = (query: string) => setSearchQuery(query);

  // If still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="prediction-list">
      <div className="header">Prediction List</div>
      <Toolbar onSearch={handleSearch} />
      <Filter />
      <CardWrapper fileList={filteredFileData} />
    </div>
  );
};
