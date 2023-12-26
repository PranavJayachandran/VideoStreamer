import express, { Request, Response } from "express";
import multer from "multer";
import path from "path";
import { transcode } from "../publisher";
import { tokenVerification } from "../middleware/authorisation";
const router = express.Router();

const videoDirectory = path.join(__dirname, "videos");
const storage = multer.diskStorage({
  destination: "./uploads/videos",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.get("/:filename", (req: Request, res: Response) => {
  const fileName = req.params.filename;
  console.log(fileName);
  const filePath = path.join(videoDirectory, "../../videos/" + fileName);
  res.sendFile(filePath);
});

router.post(
  "/upload/:filename",
  [upload.single("video"), tokenVerification],
  (req: Request, res: Response) => {
    if (!req.body || !req.body.user_id) {
      res.send({ msg: "Unauthorised" });
    }
    const file = req.file;
    if (!file) {
      return res.status(400).send("No file uploaded.");
    }
    const videoName = req.file ? req.file.filename : null;
    transcode({ fileName: videoName, id: req.body.id, function: "transcode" });
    res.status(200).send({ success: "Chunk received successfully" });
  }
);

export { router };
