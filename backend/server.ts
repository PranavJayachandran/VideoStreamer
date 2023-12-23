import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cors from "cors";
import { router as videoRoutes } from "./routes/video";
import { router as metadataRoutes } from "./routes/metadata";
import { router as thumbnailRoutes } from "./routes/thumbnail";

const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

const videoDirectory = path.join(__dirname, "videos");

app.use(express.static(path.dirname(videoDirectory)));

app.use("/video", videoRoutes);
app.use("/metadata", metadataRoutes);
app.use("/thumbnail", thumbnailRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
