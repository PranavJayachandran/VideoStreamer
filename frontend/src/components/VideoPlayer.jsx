import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";

const VideoPlayer = ({ videoPath }) => {
  console.log(videoPath);
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    if (videoPath != null) {
      const manifestURL = "http://localhost:3001/video/" + videoPath;
      const videoElement = videoPlayerRef.current;
      const player = dashjs.MediaPlayer().create();
      player.initialize(videoElement, manifestURL, false);
      return () => {
        player.reset();
      };
    }
  }, []);

  return (
    <div className="h-[450px] w-[800px]">
      <video
        ref={videoPlayerRef}
        className="object-cover h-full w-full"
        controls
      ></video>
    </div>
  );
};

export default VideoPlayer;
