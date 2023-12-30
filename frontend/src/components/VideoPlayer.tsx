import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";

interface Props {
  videoPath: string;
}
const VideoPlayer = ({ videoPath }: Props) => {
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    if (videoPath != null) {
      console.log("ASDsad");
      const manifestURL = "http://localhost:3001/video/" + videoPath;
      const videoElement = videoPlayerRef.current!;
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
