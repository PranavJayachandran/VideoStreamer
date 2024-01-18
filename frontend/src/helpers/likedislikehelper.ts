import { getCookie } from "../utils/cookie";

export const likeVideo = (video_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
  var raw = JSON.stringify({
    video_id: video_id,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likesdislikes/addlike`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export const unlikeVideo = (video_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
  var raw = JSON.stringify({
    video_id: video_id,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likesdislikes/removelike`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};

export const disLikeVideo = (video_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
  var raw = JSON.stringify({
    video_id: video_id,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likesdislikes/adddislike`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
export const undisLikeVideo = (video_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
  var raw = JSON.stringify({
    video_id: video_id,
  });

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(
    `${import.meta.env.VITE_BACKEND_URL}/likesdislikes/removedislike`,
    requestOptions
  )
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
};
