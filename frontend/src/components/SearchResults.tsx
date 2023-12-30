import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
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
const SearchResults = (): ReactElement => {
  const { query } = useParams();
  const [videos, setVideos] = useState<Array<videoData>>([]);
  useEffect(() => {
    const getVideoData = () => {
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);

      var raw = JSON.stringify({
        query: query,
      });
      let requestOptions: RequestInit = {
        method: "POST",
        redirect: "follow",
        body: raw,
        headers: myHeaders,
      };

      fetch("http://localhost:3001/metadata/search", requestOptions)
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

    getVideoData();
  }, []);
  return (
    <div className="pt-20 px-10">
      <div className="text-white flex flex-col gap-4">
        {videos.map((item) => (
          <Link to={"/video/" + item.id} state={{ videoMetaData: item }}>
            <div className="flex gap-4">
              <div>
                <img
                  src={
                    "http://localhost:3001/uploads/thumbnails/" + item.thumbnail
                  }
                  className="rounded-xl w-[320px] h-[185px] object-cover"
                />
              </div>
              <div>
                <div className="font-semibold text-lg">{item.title}</div>
                <div className="text-sm">{item.description}</div>
                <div className="text-xs font-semibold text-gray-400">
                  {item.username}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
