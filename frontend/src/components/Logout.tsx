import React, { ReactElement, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Flex, Button } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
const Logout = (): ReactElement => {
  const Logout = () => {
    localStorage.removeItem("cookie");
    window.location.reload();
  };
  return (
    <Dialog.Portal>
      <Dialog.Overlay />
      <Dialog.Content className="Logout text-white flex  items-end">
        <div className="flex flex-col gap-2 text-sm">
          Do you want to logout?
        </div>
        <Flex justify="end" className="gap-2 mt-2 text-sm">
          <Dialog.Close>
            <Button>No</Button>
          </Dialog.Close>
          <Dialog.Close>
            <button
              className="bg-red-500  px-2 py-1 rounded-xl"
              onClick={Logout}
            >
              Yes
            </button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Portal>
  );
};

export default Logout;
