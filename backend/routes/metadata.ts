import express, { Request, Response } from "express";
import { dbQuery } from "../db";
import multer from "multer";
import path from "path";
import { tokenVerification } from "../middleware/authorisation";
import { createTokens } from "../publisher";
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
  [upload.single("thumbnail"), tokenVerification],
  async (req: Request, res: Response) => {
    if (!req.body || !req.body.user_id) {
      res.send({ msg: "Unauthorised" });
    }
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
    createTokens({
      id: id[0].id,
      title: req.body.title,
      description: req.body.description,
      function: "createtags",
    });
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
  }> = await dbQuery(
    "select metadata.id,thumbnail,user_id,description,title,videopath,username from metadata join users on metadata.user_id = users.id;",
    []
  );
  for (let i = 0; i < 20; i++) {
    data.push(temp[0]);
    data.push(temp[1]);
  }
  res.send(data);
});

router.post("/search", async (req: Request, res: Response) => {
  let data: Array<{
    id: number;
    thumbnail: string;
    user_id: number;
    description: string;
    title: string;
    originalvideopath: string;
    videopath: string;
  }> = [];
  let query = req.body.query.split("+");
  let temp: Array<{
    id: number;
    thumbnail: string;
    user_id: number;
    description: string;
    title: string;
    originalvideopath: string;
    videopath: string;
  }> = await dbQuery(
    `SELECT metadata.id,thumbnail,user_id,description,title,videopath,username, coalesce(ARRAY_LENGTH(ARRAY
      (
      SELECT UNNEST($1::text[])
      INTERSECT
      SELECT UNNEST(tags)
      ),1),0) from metadata join users on metadata.user_id = users.id ORDER BY  coalesce(ARRAY_LENGTH(ARRAY
      (
      SELECT UNNEST($1)
      INTERSECT
      SELECT UNNEST(tags)
      ),1),0) DESC;`,
    [query]
  );
  res.send([temp[0], temp[1], temp[0], temp[1]]);
});
export { router };
