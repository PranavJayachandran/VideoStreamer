import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";

const DashVideoPlayer = () => {
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    const manifestURL = "http://localhost:3001/output.mpd";
    const videoElement = videoPlayerRef.current;
    const player = dashjs.MediaPlayer().create();
    player.initialize(videoElement, manifestURL, false);
    return () => {
      player.reset();
    };
  }, []);

  return (
    <div>
      <h1>MPEG-DASH Video Player</h1>
      <video ref={videoPlayerRef} controls width="640" height="360"></video>
    </div>
  );
};

export default DashVideoPlayer;
