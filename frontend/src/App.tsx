import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "@radix-ui/themes/styles.css";
import { Theme, Flex, Text, Button, TextField } from "@radix-ui/themes";
import { Navbar } from "./components/Navbar";
import { Home } from "./components/Home";
import { VideoScreen } from "./components/VideoScreen";
import { SkeletonTheme } from "react-loading-skeleton";
import { SearchResults } from "./components/SearchResults";
const App = () => {
  return (
    <BrowserRouter>
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div className="bg-black overflow-x-hidden">
          <Theme>
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="video/:videoId" element={<VideoScreen />} />
              <Route path="search/:query" element={<SearchResults />} />
            </Routes>
          </Theme>
        </div>
      </SkeletonTheme>
    </BrowserRouter>
  );
};

export default App;
