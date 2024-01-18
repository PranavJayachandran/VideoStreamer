import React, { useEffect, useRef } from "react";
import dashjs from "dashjs";

interface Props {
  videoPath: string;
}
export const VideoPlayer = ({ videoPath }: Props) => {
  const videoPlayerRef = useRef(null);

  useEffect(() => {
    if (videoPath != null) {
      const manifestURL =
        `${import.meta.env.VITE_BACKEND_URL}/video/` + videoPath;
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
