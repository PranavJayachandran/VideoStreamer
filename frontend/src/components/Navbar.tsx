import React, { ReactElement, useEffect, useState } from "react";
import UploadVideo from "./UploadVideo";
import { Link } from "react-router-dom";
import ModalButton from "./ModelButton";
import Login from "./Login";
import { getCookie } from "../utils/cookie";
import Logout from "./Logout";

const Navbar = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const getUserName = () => {
    let requestOptions: RequestInit = {
      method: "GET",
      redirect: "follow",
      headers: {
        Authorization: `Bearer ${getCookie("cookie")}`,
      },
    };

    fetch("http://localhost:3001/user/username", requestOptions)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `HTTP error! Status: ${response.status}, ${response.statusText}`
          );
        }
        return response.json();
      })
      .then((result: { username: string }) => {
        setUsername(result.username);
      })
      .catch((error) => console.log("error", error));
  };

  useEffect(() => {
    getUserName();
  }, []);
  return (
    <nav className="z-10 fixed bg-opacity-70 bg-black text-white flex w-screen justify-around gap-4 items-center px-10 py-4">
      <div className="w-2/12">
        <Link to="/">VideoStreamer</Link>
      </div>
      <div className="w-5/12 bg-gray-800 rounded-xl text-center py-2">
        Search
      </div>
      <div className="text-sm flex gap-4 items-center">
        <div>Notifiation</div>
        <ModalButton
          children={<UploadVideo />}
          message="Upload Video"
          color="bg-blue-500"
        />
        {username ? (
          <ModalButton
            children={<Logout />}
            message={`Hi, ${username}`}
            color=""
          />
        ) : (
          <ModalButton
            children={<Login />}
            message="Login"
            color="bg-blue-500"
          />
        )}
      </div>
    </nav>
  );
};

export default Navbar;
