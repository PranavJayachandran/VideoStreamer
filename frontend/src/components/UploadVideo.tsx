import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { Theme, Flex, Text, Button, TextField } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
function UploadVideo() {
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

  const handleUpload = async () => {
    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("thumbnail", thumbnail);
      formData.append("user_id", "1");
      let time = Date.now();
      let id: number = 0;
      await fetch("http://localhost:3001/metadata/upload/", {
        method: "POST",
        body: formData,
      })
        .then((result) => result.json())
        .then((x: Array<{ id: number }>) => (id = x[0].id));
      console.log("Sent the metadata in", Date.now() - time);
      time = Date.now();
      const videoData = new FormData();
      videoData.append("video", selectedVideo);
      videoData.append("id", String(id));
      await fetch("http://localhost:3001/video/upload/" + selectedVideo.name, {
        method: "POST",
        body: videoData,
      });
      console.log("Sent the video in", Date.now() - time);
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
          <Dialog.Close>
            <Button
              onClick={handleUpload}
              className="bg-blue-500 px-2 py-1 rounded-xl"
            >
              Upload
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
}

export default UploadVideo;
