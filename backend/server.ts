import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { router as videoRoutes } from "./routes/video";
import { router as metadataRoutes } from "./routes/metadata";
import { router as thumbnailRoutes } from "./routes/thumbnail";
import { router as userRoutes } from "./routes/user";
import { router as likesdisliksRouter } from "./routes/likesdislikes";
import { router as channelRouter } from "./routes/channel";

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const videoDirectory = path.join(__dirname, "videos");

app.use(express.static(path.dirname(videoDirectory)));

app.use("/video", videoRoutes);
app.use("/metadata", metadataRoutes);
app.use("/thumbnail", thumbnailRoutes);
app.use("/user", userRoutes);
app.use("/likesdislikes", likesdisliksRouter);
app.use("/channel", channelRouter);

let port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
