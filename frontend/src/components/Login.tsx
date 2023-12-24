import * as Dialog from "@radix-ui/react-dialog";
import { Flex } from "@radix-ui/themes";
import React, { ReactElement, useState } from "react";
import { setHttpOnlyCookie } from "../utils/cookie";

const Login = ({ setOpen }: any): ReactElement => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [login, setLogin] = useState<Boolean>(true);
  const [error, setError] = useState<String>("");
  const handleCancel = () => {
    setPassword("");
    setUsername("");
  };
  const handleLogin = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/user/login", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setHttpOnlyCookie("cookie", result.token);
          setOpen(false);
          window.location.reload();
        } else {
          setError(result.msg);
        }
      })
      .catch((error) => console.log("error", error));
  };

  const handleSignUp = () => {
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var raw = JSON.stringify({
      username: username,
      password: password,
    });

    var requestOptions: RequestInit = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("http://localhost:3001/user/signup", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        if (result.token) {
          setOpen(false);
          setHttpOnlyCookie("cookie", result.token);
          window.location.reload();
        } else setError(result.msg);
      })
      .catch((error) => console.log("error", error));
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay className="DialogOverlay" />
      <Dialog.Content className="DialogContent flex flex-col items-center justify-around text-white">
        <div className="flex flex-col gap-4">
          <div className="text-red-500">{error}</div>
          <div className="">
            <label className="text-sm">Username</label>
            <br />
            <input
              type="text"
              className="bg-[#1b1b1b] border-gray-600 border rounded-sm w-96 h-10"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
              }}
            ></input>
          </div>
          <div>
            <label className="text-sm">Password</label>
            <br />
            <input
              type="password"
              className="bg-[#1b1b1b] border-gray-600 border rounded-sm w-96 h-10"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          {!login ? (
            <button
              className="text-sm underline text-gray-400"
              onClick={() => setLogin(true)}
            >
              Have an account? Login
            </button>
          ) : (
            <button
              className="text-sm underline text-gray-400"
              onClick={() => setLogin(false)}
            >
              Don't have an account? Sign up
            </button>
          )}
        </div>

        <Flex justify="end" className="gap-4 mt-2">
          <Dialog.Close>
            <button onClick={handleCancel}>Cancel</button>
          </Dialog.Close>
          <button>
            {login ? (
              <button
                onClick={handleLogin}
                className="px-2 py-1 rounded-xl bg-blue-500"
              >
                Login
              </button>
            ) : (
              <button
                onClick={handleSignUp}
                className="px-2 py-1 rounded-xl bg-blue-500"
              >
                SignUp
              </button>
            )}
          </button>
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Login;
