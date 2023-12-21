import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme, Flex, Text, Button, TextField } from "@radix-ui/themes";
import * as Dialog from "@radix-ui/react-dialog";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import VideoScreen from "./components/VideoScreen";
const App = () => {
  return (
    <BrowserRouter>
      <div className="bg-black overflow-x-hidden">
        <Theme>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="video/:videoId" element={<VideoScreen />} />
          </Routes>
        </Theme>
      </div>
    </BrowserRouter>
  );
};

export default App;
