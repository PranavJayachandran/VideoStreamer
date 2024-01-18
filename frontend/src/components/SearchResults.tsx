import React, { ReactElement, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { getCookie } from "../utils/cookie";
import { IVideoData } from "../interfaces/IVideoData";

export const SearchResults = (): ReactElement => {
  const { query } = useParams();
  const [videos, setVideos] = useState<Array<IVideoData>>([]);
  useEffect(() => {
    const getVideoData = async () => {
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
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/metadata/search`,
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

    getVideoData();
  }, [query]);
  return (
    <div className="pt-20 px-10">
      <div className="text-white flex flex-col gap-4">
        {videos.map((item) => (
          <Link to={"/video/" + item.id} state={{ videoMetaData: item }}>
            <div className="flex gap-4">
              <div>
                <img
                  src={
                    `${import.meta.env.VITE_BACKEND_URL}/uploads/thumbnails/` +
                    item.thumbnail
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
