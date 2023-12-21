import React, { useEffect, useState } from "react";
import VideoCard from "./VideoCard";

const Home = () => {
  const x = [];
  for (let i = 0; i < 20; i++) x.push(i);
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    const getVideos = () => {
      var requestOptions = {
        method: "GET",
        redirect: "follow",
      };

      fetch("http://localhost:3001/metadata", requestOptions)
        .then((response) => response.json())
        .then((result) => setVideos((prev) => [...prev, result]))
        .catch((error) => console.log("error", error));
    };

    getVideos();
  }, []);

  useEffect(() => {
    console.log(videos);
  }, [videos]);
  return (
    <div className="pt-20 px-10">
      <div className="flex flex-wrap gap-6 justify-center">
        {x.map((val) => {
          videos.map((item) => <VideoCard />);
        })}
      </div>
    </div>
  );
};

export default Home;
