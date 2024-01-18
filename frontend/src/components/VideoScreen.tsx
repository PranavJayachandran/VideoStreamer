import React, { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import { VideoPlayer } from "./VideoPlayer";
import { AiFillLike, AiFillDislike } from "react-icons/ai";
import { getCookie } from "../utils/cookie";
import {
  disLikeVideo,
  likeVideo,
  undisLikeVideo,
  unlikeVideo,
} from "../helpers/likedislikehelper";
import { ChannelName } from "./ChannelName";
import { Comments } from "./Comments";
import { IVideoMetadata } from "../interfaces/IVideoMetadata";

export const VideoScreen = () => {
  let { state } = useLocation();
  let { videoMetaData }: { videoMetaData: IVideoMetadata } = state;
  let { title, description, videopath, username } = videoMetaData;
  const [showDescription, setShowDescription] = useState<boolean>(false);
  const [like, setLike] = useState<number>(0);
  const [dislike, setDislike] = useState<number>(0);
  const [isLiked, setIsLiked] = useState<Boolean>(false);
  const [isDisliked, setIsDisliked] = useState<Boolean>(false);

  const getLikeDislikeCommentData = async () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
    var requestOptions: RequestInit = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    try {
      let response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/likesdislikes?video_id=` +
          videoMetaData.id,
        requestOptions
      );
      if (!response.ok) {
        throw new Error(
          `HTTP error! Status: ${response.status}, ${response.statusText}`
        );
      }
      let result = await response.json();
      setLike(parseInt(result.likes));
      setDislike(parseInt(result.dislikes));
      setIsDisliked(result.disliked);
      setIsLiked(result.liked);
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    getLikeDislikeCommentData();
  }, []);
  const handleLike = () => {
    if (isLiked == true) return;
    if (isDisliked == true) {
      setDislike(dislike - 1);
      setIsDisliked(false);
      undisLikeVideo(videoMetaData.id);
    }
    likeVideo(videoMetaData.id);
    setLike(like + 1);
    setIsLiked(!isLiked);
  };
  const handleDislike = () => {
    if (isDisliked == true) return;
    if (isLiked == true) {
      setLike(like - 1);
      setIsLiked(false);
      unlikeVideo(videoMetaData.id);
    }
    disLikeVideo(videoMetaData.id);
    setDislike(dislike + 1);
    setIsDisliked(!isDisliked);
  };
  return (
    <div className="pt-20 text-white h-screen px-10 flex gap-8">
      <div className="w-8/12">
        <VideoPlayer videoPath={videopath} />
        <div className="">
          <div className=" px-10 flex justify-between">
            <h1 className="text-2xl">{title}</h1>
            <div className="flex items-center gap-4">
              <AiFillLike
                className={`cursor-pointer h-5 w-5 ${
                  isLiked ? "text-blue-600" : ""
                }`}
                onClick={handleLike}
              />
              <span className="text-sm -ml-3">{like}</span>
              <AiFillDislike
                className={`cursor-pointer h-5 w-5 ${
                  isDisliked ? "text-red-600" : ""
                }`}
                onClick={handleDislike}
              />
              <span className="text-sm -ml-3">{dislike}</span>
            </div>
          </div>
          <div className="text-sm py-4 rounded-sm px-10 mt-4 bg-gray-900">
            {showDescription ? (
              <>
                {description}
                {description.length > 200 ? (
                  <>
                    <br />
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => setShowDescription(!showDescription)}
                    >
                      Read Less
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </>
            ) : (
              <>
                {description.substring(0, 200)}
                {description.length > 200 ? (
                  <>
                    {+"....."}
                    <br />
                    <span
                      className="hover:underline cursor-pointer"
                      onClick={() => setShowDescription(!showDescription)}
                    >
                      Read More
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </>
            )}
          </div>
          <ChannelName
            user_id={videoMetaData.user_id}
            username={videoMetaData.username}
          />
        </div>
        <Comments video_id={videoMetaData.id} />
      </div>
      <div>Something will comeback</div>
    </div>
  );
};


