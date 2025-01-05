import "./VideoPlayer.css";

import { useEffect, useRef, useState } from "react";
import { useSelectedFileContext } from "../../../../../hooks/useSelectedFileContext";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";
import { useCachedVideoContext } from "../../../../../hooks/useCachedVideoContext";
import { usePlaybackContext } from "../../../../../hooks/usePlaybackContext";

interface VideoPlayerProps {
  videoUrlChanged: (url: string | null) => void;
}

export const VideoPlayer = ({
  videoUrlChanged,
}: VideoPlayerProps): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const { cachedVideos } = useCachedVideoContext();
  const { isPlaying } = usePlaybackContext();

  const videoBufferCache = VideoBufferCache.getInstance();
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null); // Ref to the video element

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // If there is no selected file or the video is not in the cachedVideos, reset the videoUrl
    if (
      !selectedFile ||
      !cachedVideos.some((video) => video.file_name === selectedFile.fileName)
    ) {
      setVideoUrl(null); // Clear the video URL if the file is not cached
      videoUrlChanged(null); // Notify the parent that no video is available
      return;
    }

    if (selectedFile?.fileName) {
      console.log(
        `Checking if ${selectedFile.fileName} is cached:`,
        videoBufferCache.isCached(selectedFile.fileName)
      );

      if (videoBufferCache.isCached(selectedFile.fileName)) {
        const videoBlob = videoBufferCache.getVideo(selectedFile.fileName);
        // console.log(`Video ${selectedFile.fileName} found in the VBCache.`);

        if (videoBlob) {
          // console.log(`Blob for ${selectedFile.fileName} found. Creating object URL...`);

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
  }, [selectedFile, videoBufferCache, videoUrlChanged, cachedVideos]);

  // Reload the video player when a new video is selected
  useEffect(() => {
    if (videoPlayerRef.current && videoUrl) {
      // console.log("Reloading video player...");
      videoPlayerRef.current.load();
    }
  }, [videoUrl]);

  useEffect(() => {
    if (videoPlayerRef.current) {
      if (isPlaying) {
        videoPlayerRef.current.play(); // Play video when isPlaying is true
      } else {
        videoPlayerRef.current.pause(); // Pause video when isPlaying is false
      }
    }
  }, [isPlaying]); // Re-run effect when isPlaying changes

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
          // autoPlay // Autoplay the video when selected
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
