import { getCookie } from "./cookie";

export const isUserSignedIn = async (): Promise<Boolean> => {
  let requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${getCookie("cookie")}`,
    },
  };
  let auth = false;
  await fetch("http://localhost:3001/user/isauthenticated", requestOptions)
    .then(async (response) => {
      if (!response.ok) {
        auth = false;
      } else {
        auth = true;
      }
    })
    .catch((error) => console.log("Error: ", error));
  return auth;
};

export const getUser = async () => {
  let requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${getCookie("cookie")}`,
    },
  };

  let response = await fetch(
    "http://localhost:3001/user/username",
    requestOptions
  );
  if (!response.ok) {
    throw new Error(
      `HTTP error! Status: ${response.status}, ${response.statusText}`
    );
  }
  let result: { username: string; id: number } = await response.json();
  return result;
};
