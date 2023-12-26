import { getCookie } from "./cookie";

export const isUserSignedIn = async (): Promise<Boolean> => {
  let requestOptions: RequestInit = {
    method: "GET",
    redirect: "follow",
    headers: {
      Authorization: `Bearer ${getCookie("cookie")}`,
    },
  };

  fetch("http://localhost:3001/metadata", requestOptions).then((response) => {
    if (!response.ok) return false;
    else return true;
  });

  return false;
};
