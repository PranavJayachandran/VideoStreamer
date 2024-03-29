import React, { ReactElement, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Flex, Button } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import { isUserSignedIn } from "../utils/userAuth";
import { getCookie } from "../utils/cookie";
export const UploadVideo = ({ setOpen }: any): ReactElement => {
  const handleVideo = (files: any[]) => {
    const file = files[0];
    setSelectedVideo(file);
  };
  const handleThumbnail = (files: any[]) => {
    const file = files[0];
    setThumbnail(file);
  };

  const { getRootProps: getRootPropsImage, getInputProps: getInputPropsImage } =
    useDropzone({
      onDrop: handleThumbnail,
      accept: {
        "image/png": [".png"],
        "image/jpg": [".jpg"],
        "image/jpeg": [".jpeg"],
      },
    });
  const { getRootProps: getRootPropsVideo, getInputProps: getInputPropsVideo } =
    useDropzone({
      onDrop: handleVideo,
      accept: {
        "video/mp4": [".mp4"],
        "video/mkv": [".mkv"],
      },
    });
  const [selectedVideo, setSelectedVideo] = useState<any>(null);
  const [thumbnail, setThumbnail] = useState<any>(null);
  const [description, setDescription] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [error, setError] = useState<string>("");

  const handleUpload = async () => {
    let isAuthenticated: Boolean = await isUserSignedIn();
    if (!isAuthenticated) {
      setError("Please login to upload");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      let time = Date.now();
      let id: number = 0;

      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/metadata/upload/`,
          {
            method: "POST",
            body: formData,
            headers: {
              Authorization: `Bearer ${getCookie("cookie")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }
        let result = await response.json();
        if (result.msg) {
          setError(result.msg);
        } else {
          id = result[0].id;
        }
      } catch (error) {
        console.log("error", error);
      }

      console.log("Sent the metadata in", Date.now() - time);
      time = Date.now();

      const videoData = new FormData();
      videoData.append("video", selectedVideo);
      videoData.append("id", String(id));
      try {
        let response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/video/upload/` +
            selectedVideo.name,
          {
            method: "POST",
            body: videoData,
            headers: {
              Authorization: `Bearer ${getCookie("cookie")}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }
        let result = await response.json();
        if (result.msg) {
          setError(result.msg);
        }
      } catch (error) {
        console.log("error", error);
      }
      console.log("Sent the video in", Date.now() - time);

      setOpen(false);
    } catch (err) {
      console.log("Error while uplaoding file", err);
    }
    handleCancel();
  };
  const handleCancel = () => {
    setDescription("");
    setSelectedVideo(null);
    setThumbnail(null);
    setTitle("");
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent text-white">
        <div className="flex flex-col gap-2">
          <div className="flex gap-10 items-center">
            <div>
              <div className="text-red-600 text-sm">{error}</div>
              <div className="">
                <label className="text-sm">Enter the title</label>
                <br />
                <input
                  type="text"
                  className="bg-[#1b1b1b] border-gray-600 border rounded-sm w-96 h-10"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                ></input>
              </div>
              <div>
                <label className="text-sm">Enter the description</label>
                <br />
                <textarea
                  className="rounded-sm bg-[#1b1b1b] border-gray-600 border w-96 h-20"
                  style={{ resize: "none" }}
                  value={description}
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                ></textarea>
              </div>
            </div>
            <div
              {...getRootPropsImage()}
              className="w-32 text-xs text-center rounded-xl h-32 flex justify-center items-center bg-[#1b1b1b] border-gray-600 border"
            >
              <p>Upload the thumbnail</p>
              <input {...getInputPropsImage()} />
            </div>
          </div>
          <div
            {...getRootPropsVideo()}
            className="bg-[#1b1b1b] border-gray-600 border rounded-lg 
        border-dotted h-36 flex justify-center items-center"
          >
            <p>Upload the video</p>
            <input {...getInputPropsVideo()} />
          </div>
        </div>
        <Flex justify="end" className="gap-4 mt-2 text-sm">
          <Dialog.Close>
            <Button onClick={handleCancel}>Cancel</Button>
          </Dialog.Close>
          <Button
            onClick={handleUpload}
            className="bg-blue-500 px-2 py-1 rounded-xl"
          >
            Upload
          </Button>{" "}
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

