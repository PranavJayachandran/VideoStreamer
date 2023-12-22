import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";
import SkeletonComponent from "./SkeletonComponent";

const Home = () => {
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:3001/metadata", requestOptions)
        .then((response) => response.json())
        .then((result) => {
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
