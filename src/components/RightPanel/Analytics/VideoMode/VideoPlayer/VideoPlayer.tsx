import "./VideoPlayer.css";

import { useEffect, useState } from "react";
import { useSelectedFileContext } from "../../../../../hooks/useSelectedFileContext";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";

export const VideoPlayer = (): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const videoCache = VideoBufferCache.getInstance();

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // console.log("Selected file:", selectedFile); // Debugging selectedFile

    if (selectedFile?.fileName) {
      console.log(
        `Checking if ${selectedFile.fileName} is cached:`,
        videoCache.isCached(selectedFile.fileName)
      );

      if (videoCache.isCached(selectedFile.fileName)) {
        const videoBlob = videoCache.getVideo(selectedFile.fileName);
        // console.log(`Video ${selectedFile.fileName} found in the VBCache.`);

        if (videoBlob) {
          const url = URL.createObjectURL(videoBlob);
          setVideoUrl(url);

          // Cleanup the object URL when the component unmounts or when a new video is selected
          return () => {
            if (url) {
              URL.revokeObjectURL(url);
            }
          };
        }
      } else {
        // If the video is not cached, clear the videoUrl
        setVideoUrl("");
      }
    }
  }, [selectedFile, videoCache]);

  return (
    <div className="video-player-container">
      <video className="video-player" width="100%" height="100%" controls>
        <source src={videoUrl || ""} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
