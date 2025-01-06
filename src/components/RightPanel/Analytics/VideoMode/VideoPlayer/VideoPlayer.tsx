import "./VideoPlayer.css";

import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { useSelectedFileContext } from "../../../../../hooks/useSelectedFileContext";
import { VideoBufferCache } from "../../../../../managers/VideoBufferCacheManager";
import { useCachedVideoContext } from "../../../../../hooks/useCachedVideoContext";
import { usePlaybackContext } from "../../../../../hooks/usePlaybackContext";
import { config } from "../../../../../config/config";
import { getOrCreateDeviceId } from "../../../../../utils/deviceIdUtils";
import { Colors } from "../../../../../styles/colors";

interface VideoPlayerProps {
  videoUrlChanged: (url: string | null) => void;
  setVideoPresent: (isPresent: boolean) => void;
}

export const VideoPlayer = ({
  videoUrlChanged,
  setVideoPresent,
}: VideoPlayerProps): JSX.Element => {
  const { selectedFile } = useSelectedFileContext();
  const { cachedVideos } = useCachedVideoContext();
  const {
    isPlaying,
    isScrubbing,
    scrubTargetSeconds,
    setCurrentSeconds,
    setPlaybackState,
    setIsVideoLoading,
  } = usePlaybackContext();

  const videoBufferCache = VideoBufferCache.getInstance();
  const videoPlayerRef = useRef<HTMLVideoElement | null>(null);

  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchVideo = async (fileName: string) => {
      try {
        // Construct the URL for the GET request
        const url = `${
          config.connection_address
        }/video/${fileName}?device_id=${getOrCreateDeviceId()}`;

        console.log("Attemping to retrieve file from server, URL:", url);

        setLoading(true);
        setIsVideoLoading(true);
        setVideoPresent(false);

        const response = await axios.get(url, { responseType: "blob" });

        setLoading(false);
        setIsVideoLoading(false);
        setVideoPresent(true);

        // If the request is successful, handle the video blob
        const videoBlob = response.data;
        if (config.debug_level === 1)
          console.log("Video retrieved successfully:", videoBlob);

        // Optionally, create a URL for the video and display it in an HTML element
        const newBlobUrl = URL.createObjectURL(videoBlob);

        if (config.debug_level === 2) console.log("Video URL:", newBlobUrl);

        return newBlobUrl;
      } catch (error) {
        console.error("Error fetching video:", error);
      }
    };

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
      if (config.debug_level === 1)
        console.log(
          `Checking if ${selectedFile.fileName} is cached:`,
          videoBufferCache.isCached(selectedFile.fileName)
        );

      if (videoBufferCache.isCached(selectedFile.fileName)) {
        const videoBlob = videoBufferCache.getVideo(selectedFile.fileName);
        if (config.debug_level === 2)
          console.log(`Video ${selectedFile.fileName} found in the VBCache.`);

        if (videoBlob) {
          if (config.debug_level === 2)
            console.log(
              `Blob for ${selectedFile.fileName} found. Creating object URL...`
            );

          const newBlobUrl = URL.createObjectURL(videoBlob);
          setVideoUrl(newBlobUrl);
          videoUrlChanged(newBlobUrl); // Notify parent about the new video URL
        }
      } else {
        // If the video is not cached, clear the videoUrl
        if (config.debug_level === 1)
          console.log(`${selectedFile.fileName} not cached yet.`);

        // Fetch the video from the server if not cached
        fetchVideo(selectedFile.fileName).then((newBlobUrl) => {
          if (newBlobUrl) {
            setVideoUrl(newBlobUrl);
            videoUrlChanged(newBlobUrl); // Notify parent about the new video URL
          }
        });
      }
    } else {
      setVideoUrl("");
      videoUrlChanged(null); // Notify parent that no video is present
    }
  }, [
    selectedFile,
    videoBufferCache,
    videoUrlChanged,
    cachedVideos,
    setVideoPresent,
    setIsVideoLoading,
  ]);

  // Reload the video player when a new video is selected
  useEffect(() => {
    if (videoPlayerRef.current && videoUrl) {
      if (config.debug_level === 2) console.log("Reloading video player...");

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

  if (loading) {
    return (
      <div className="video-player-container">
        <div className="loading-container">
          <p className="loading-text">Loading video</p>
          <l-dot-stream size="32" speed="2.5" color={Colors.foreground} />
        </div>
      </div>
    );
  }

  return (
    <div className="video-player-container">
      {videoUrl ? (
        <video
          ref={videoPlayerRef}
          className="video-player"
          controls
          onError={(e) => {
            if (config.debug_errors) console.error("Video playback error:", e);
          }}
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
