import React, { ReactElement, useEffect, useState } from "react";
import { UploadVideo } from "./UploadVideo";
import { Link } from "react-router-dom";
import { ModalButton } from "./ModelButton";
import { Login } from "./Login";
import { getCookie } from "../utils/cookie";
import { Logout } from "./Logout";
import { FaSearch } from "react-icons/fa";
import { getUser } from "../utils/userAuth";

export const Navbar = (): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [searchString, setSearchString] = useState<string>("");
  const getUserName = async () => {
    let data = await getUser();
    setUsername(data.username);
  };

  useEffect(() => {
    getUserName();
  }, []);
  const convertToQuery = (query: string): string => {
    let temp = "";
    let queryString = "";
    for (let i = 0; i < query.length; i++) {
      if (query[i] != " ") temp += query[i];
      else {
        if (temp.length > 0) {
          if (queryString.length > 0) queryString += "+";
          queryString += temp;
          temp = "";
        }
      }
    }
    if (temp.length > 0) {
      if (queryString.length > 0) queryString += "+";
      queryString += temp;
    }
    return queryString;
  };
  return (
    <nav className="z-10 fixed bg-opacity-70 bg-black text-white flex w-screen justify-around gap-4 items-center px-10 py-4">
      <div className="w-2/12">
        <Link to="/">VideoStreamer</Link>
      </div>
      <div className="flex items-center gap-4 pr-4 w-5/12 bg-gray-800 rounded-xl text-center">
        <input
          className="w-full bg-transparent focus:ring ring-gray-600 rounded-xl"
          value={searchString}
          onChange={(e) => setSearchString(e.target.value)}
        ></input>
        <Link to={`/search/${convertToQuery(searchString)}`}>
          <FaSearch className="cursor-pointer" />
        </Link>
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

