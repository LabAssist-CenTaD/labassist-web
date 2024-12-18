import "./VideoPlayer.css";

import { useEffect, useRef, useState } from "react";
import { useSelectedFileContext } from "../../../../../hooks/useSelectedFileContext";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";

interface VideoPlayerProps {
  videoUrlChanged: (url: string | null) => void;
}

export const VideoPlayer = ({
  videoUrlChanged,
}: VideoPlayerProps): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const videoCache = VideoBufferCache.getInstance();
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null); // Ref to the video element

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
          // console.log(`Blob for ${selectedFile.fileName} found. Creating object URL...`);

          // Ensure that the Blob is of the correct type (video/mp4)
          // if (videoBlob.type !== "video/mp4") {
          //   console.error("The cached blob is not of type video/mp4");
          //   return;
          // }

          const url = URL.createObjectURL(videoBlob);
          setVideoUrl(url);
          videoUrlChanged(url); // Notify parent about the new video URL
        }
      } else {
        // If the video is not cached, clear the videoUrl
        // console.log(`${selectedFile.fileName} not cached yet.`);
        setVideoUrl("");
        videoUrlChanged(null); // Notify parent that no video is present
      }
    }
  }, [selectedFile, videoCache, videoUrlChanged]);

  // Reload the video player when a new video is selected
  useEffect(() => {
    if (videoPlayerRef.current && videoUrl) {
      // console.log("Reloading video player...");
      videoPlayerRef.current.load();
    }
  }, [videoUrl]);

  // Revoke the object URL when the component is unmounted
  useEffect(() => {
    return () => {
      if (videoUrl) {
        // console.log("Releasing object URL...");
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);

  return (
    <div className="video-player-container">
      {videoUrl ? (
        <video
          ref={videoPlayerRef}
          className="video-player"
          controls
          onError={(e) => console.error("Video playback error:", e)}
        >
          <>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/quicktime" />
            <source src={videoUrl} type="video/x-msvideo" />
          </>
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="no-video-selected">No video selected/avaliable.</p>
      )}
    </div>
  );
};
