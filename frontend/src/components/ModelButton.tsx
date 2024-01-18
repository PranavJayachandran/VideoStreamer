import React, { ReactElement, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";

export const ModalButton = ({
  children,
  message,
  color,
}: {
  children: ReactElement;
  message: string;
  color: string;
}): ReactElement => {
  const [open, setOpen] = useState<any>(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger>
        <button className={`cursor-pointer px-2 py-2 ${color} rounded-xl`}>
          {message}
        </button>
      </Dialog.Trigger>
      {React.cloneElement(children, { setOpen: setOpen })}
    </Dialog.Root>
  );
};


