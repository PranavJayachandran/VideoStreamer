import React, { ReactElement } from "react";
import { Theme, Flex, Text, Button, TextField } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import UploadVideo from "./UploadVideo";
import { Link } from "react-router-dom";

const ModalButton = (): ReactElement => {
  return (
    <Dialog.Root>
      <Dialog.Trigger>
        <Button className="cursor-pointer bg-blue-500 text-xs">
          Upload Video
        </Button>
      </Dialog.Trigger>
      <UploadVideo />
    </Dialog.Root>
  );
};
const Navbar = (): ReactElement => {
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
        <ModalButton />
        <div>Login</div>
      </div>
    </nav>
  );
};

export default Navbar;
