import React, { ReactElement, useEffect, useState } from "react";
import { VideoCard } from "./VideoCard";
import { SkeletonComponent } from "./SkeletonComponent";
import { getCookie } from "../utils/cookie";
import { IVideoData } from "../interfaces/IVideoData";

export const Home = (): ReactElement => {
  const [videos, setVideos] = useState<Array<IVideoData>>([]);
  useEffect(() => {
    const getVideos = async () => {
      let requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${getCookie("cookie")}`,
        },
      };

      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/metadata`,
          requestOptions
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }
        let result = await response.json();
        setVideos(result);
      } catch (error) {
        console.log("error", error);
      }
    };

    getVideos();
  }, []);

  return (
    <div className="pt-20 px-10">
      <div className="flex flex-wrap gap-6 justify-center">
        {videos.length == 0 ? <SkeletonComponent cards={12} /> : <></>}
        {videos.map((item, index) => (
          <VideoCard item={item} key={index} />
        ))}
      </div>
    </div>
  );
};
