import React from "react";
import VideoPlayer from "./components/VideoPlayer";
import UploadVideo from "./components/UploadVideo";
import "@radix-ui/themes/styles.css";
import { Theme, Flex, Text, Button, TextField } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import Navbar from "./components/Navbar";
const App = () => {
  return (
    <div className="bg-black h-screen w-screen">
      <Theme>
        <Navbar />
      </Theme>
    </div>
  );
};

export default App;
