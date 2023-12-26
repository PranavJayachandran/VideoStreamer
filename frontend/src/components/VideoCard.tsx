import React from "react";
import { Link } from "react-router-dom";

interface item {
  id: number;
  thumbnail: string;
  user_id: string;
  description: string;
  title: string;
  videopath: string;
  username: string;
}
const VideoCard = ({ item }: { item: item }) => {
  console.log("CARd", item);
  const videoMetaData: item = item;
  return (
    <Link to={"/video/" + item.id} state={{ videoMetaData: videoMetaData }}>
      <div className="w-[375px] ">
        <div>
          <img
            className="rounded-xl object-cover w-[400px] h-[225px]"
            src={"http://localhost:3001/uploads/thumbnails/" + item.thumbnail}
          ></img>
        </div>
        <div className="flex mt-2">
          <div className="w-1/6">
            <img
              className="rounded-full h-10 w-10"
              src="data:image/jpeg;base64,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"
            ></img>
          </div>
          <div className=" w-5/6  pr-4">
            <div className="text-lg  leading-6 text-gray-300">{item.title}</div>
            <div className="text-gray-500">{item.username}</div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default VideoCard;
