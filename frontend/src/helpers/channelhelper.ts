import { getCookie } from "../utils/cookie";

export const fetchChannelData = async (channel_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var requestOptions: RequestInit = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };
  try {
    let response = await fetch(
      `http://localhost:3001/channel?owner=${channel_id}`,
      requestOptions
    );
    let result = await response.json();
    let data: { numberofmembers: string } = result;
    myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);
    requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };
    response = await fetch(
      `http://localhost:3001/channel/ismember?owner=${channel_id}`,
      requestOptions
    );

    result = await response.json();
    return {
      numberofmembers: data.numberofmembers,
      isMember: result.isMember,
    };
  } catch (error) {
    console.log(error);
    return { numberofmembers: "2", isMember: false };
  }
};

export const joinChannel = async (channel_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ channel_id: channel_id }),
    redirect: "follow",
  };
  try {
    let response = await fetch(
      "http://localhost:3001/channel/join",
      requestOptions
    );
    let result = await response.json();
    return result;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};

export const leaveChannel = async (channel_id: number) => {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization", `Bearer ${getCookie("cookie")}`);

  var requestOptions: RequestInit = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify({ channel_id: channel_id }),
    redirect: "follow",
  };
  try {
    let response = await fetch(
      "http://localhost:3001/channel/leave",
      requestOptions
    );
    let result = response.json();
    return result;
  } catch (error) {
    console.log(error);
    return { error: error };
  }
};
