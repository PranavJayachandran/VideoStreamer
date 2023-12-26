import React, { ReactElement, useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import SkeletonComponent from "./SkeletonComponent";
import { getCookie } from "../utils/cookie";

interface videoData {
  id: number;
  thumbnail: string;
  user_id: string;
  description: string;
  title: string;
  videopath: string;
  username: string;
}
const Home = (): ReactElement => {
  const [videos, setVideos] = useState<Array<videoData>>([]);
  useEffect(() => {
    const getVideos = () => {
      let requestOptions: RequestInit = {
        method: "GET",
        redirect: "follow",
        headers: {
          Authorization: `Bearer ${getCookie("cookie")}`,
        },
      };

      fetch("http://localhost:3001/metadata", requestOptions)
        .then((response) => {
          if (!response.ok) {
            throw new Error(
              `HTTP error! Status: ${response.status}, ${response.statusText}`
            );
          }
          return response.json();
        })
        .then((result: Array<videoData>) => {
          setVideos(result);
        })
        .catch((error) => console.log("error", error));
    };

    getVideos();
  }, []);

  return (
    <div className="pt-20 px-10">
      <div className="flex flex-wrap gap-6 justify-center">
        {videos.length == 0 ? <SkeletonComponent cards={12} /> : <></>}
        {videos.map((item) => (
          <VideoCard item={item} />
        ))}
      </div>
    </div>
  );
};

export default Home;
