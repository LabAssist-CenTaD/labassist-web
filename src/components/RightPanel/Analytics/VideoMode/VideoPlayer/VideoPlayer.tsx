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
  const {
    isPlaying,
    isScrubbing,
    scrubTargetSeconds,
    setCurrentSeconds,
    setPlaybackState,
  } = usePlaybackContext();

  const videoBufferCache = VideoBufferCache.getInstance();
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);

  useEffect(() => {
    // If there is no selected file or the video is not in the cachedVideos, reset the videoUrl
    if (
      !selectedFile ||
      !cachedVideos.some((video) => video.file_name === selectedFile.fileName)
    ) {
      setVideoUrl(null);
      videoUrlChanged(null);
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
      if (isPlaying && !isScrubbing) {
        videoPlayerRef.current.play();
      } else {
        videoPlayerRef.current.pause();
      }
    }
  }, [isPlaying, isScrubbing]);

  useEffect(() => {
    const videoElement = videoPlayerRef.current;

    if (videoElement) {
      const updatePlaybackContext = () => {
        setCurrentSeconds(videoElement.currentTime);
        setPlaybackState({
          currentSeconds: videoElement.currentTime,
          durationSeconds: videoElement.duration || 0,
          isPlaying: !videoElement.paused && !videoElement.ended,
        });
      };

      videoElement.addEventListener("timeupdate", updatePlaybackContext);
      videoElement.addEventListener("durationchange", updatePlaybackContext);

      return () => {
        videoElement.removeEventListener("timeupdate", updatePlaybackContext);
        videoElement.removeEventListener(
          "durationchange",
          updatePlaybackContext
        );
      };
    }
  }, [setCurrentSeconds, setPlaybackState]);

  useEffect(() => {
    if (isScrubbing && videoPlayerRef.current) {
      videoPlayerRef.current.currentTime = scrubTargetSeconds || 0;
    } else if (!isScrubbing && videoPlayerRef.current) {
      videoPlayerRef.current.play();
    }
  }, [isScrubbing, scrubTargetSeconds]);

  useEffect(() => {
    return () => {
      if (videoUrl) {
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
          // autoPlay
        >
          <>
            <source src={videoUrl} type="video/mp4" />
            <source src={videoUrl} type="video/quicktime" />
            <source src={videoUrl} type="video/x-msvideo" />
          </>
          Your browser does not support the video tag.
        </video>
      ) : (
        <p className="no-video-selected">No video selected/available.</p>
      )}
    </div>
  );
};
