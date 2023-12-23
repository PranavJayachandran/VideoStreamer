import express, { Request, Response } from "express";
import { dbQuery } from "../db";
import multer from "multer";
import path from "path";
const router = express.Router();
const storage = multer.diskStorage({
  destination: "./uploads/thumbnails",
  filename: function (req: Request, file: any, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
const upload = multer({ storage: storage });

router.use(express.json());
router.post(
  "/upload",
  upload.single("thumbnail"),
  async (req: Request, res: Response) => {
    const imageName = req.file ? req.file.filename : null;
    const id = await dbQuery(
      "INSERT into metadata (title, description, user_id, originalVideoStoragepath,thumbnail) values ($1,$2,$3,$4,$5) returning id",
      [
        req.body.title,
        req.body.description,
        req.body.user_id,
        "output.mpd",
        imageName,
      ]
    );
    res.send(id);
  }
);
router.get("/", async (req: Request, res: Response) => {
  let data: Array<{
    id: number;
    thumbnail: string;
    user_id: number;
    description: string;
    title: string;
    originalvideopath: string;
    videopath: string;
  }> = [];
  let temp: Array<{
    id: number;
    thumbnail: string;
    user_id: number;
    description: string;
    title: string;
    originalvideopath: string;
    videopath: string;
  }> = await dbQuery("SELECT * from metadata", []);
  for (let i = 0; i < 20; i++) {
    data.push(temp[0]);
    data.push(temp[1]);
    data.push(temp[2]);
  }
  res.send(data);
});

export { router };
