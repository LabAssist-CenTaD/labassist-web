import "./VideoPlayer.css";

export const VideoPlayer = (): JSX.Element => {
  return (
    <div className="video-player-container">
      <video className="video-player" width="100%" height="100%" controls>
        <source src="path-to-your-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
