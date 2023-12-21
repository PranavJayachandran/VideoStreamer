import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";

const VideoPlayer = () => {
  const videoPlayerRef = useRef(null);

  // useEffect(() => {
  //   const manifestURL = "http://localhost:3001/video/output.mpd";
  //   const videoElement = videoPlayerRef.current;
  //   const player = dashjs.MediaPlayer().create();
  //   player.initialize(videoElement, manifestURL, false);
  //   return () => {
  //     player.reset();
  //   };
  // }, []);

  return (
    <div>
      <video ref={videoPlayerRef} controls width="800" height="450"></video>
    </div>
  );
};

export default VideoPlayer;
