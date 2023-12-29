import express, { Request, Response } from "express";
import { tokenVerification } from "../middleware/authorisation";
import { dbQuery } from "../db";

const router = express.Router();

router.get("/", tokenVerification, async (req: Request, res: Response) => {
  let user_id = req.body.user_id;
  let video_id = req.query.video_id;

  try {
    let row = await dbQuery(
      "select nl,nd from (select count(*) as nl from likes where video_id=$1) as l,(select count(*) as nd from dislikes where video_id=$1) as d",
      [video_id]
    );
    let likes = row[0].nl,
      dislikes = row[0].nd,
      liked = false,
      disliked = false;

    row = await dbQuery(
      "SELECT count(*) from likes where user_id=$1 and video_id=$2",
      [user_id, video_id]
    );
    if (row[0].count > 0) liked = true;
    row = await dbQuery(
      "SELECT count(*) from dislikes where user_id=$1 and video_id=$2",
      [user_id, video_id]
    );
    if (row[0].count > 0) disliked = true;
    res.send({
      likes,
      dislikes,
      liked,
      disliked,
    });
  } catch (error) {
    res.status(400);
    res.send({ msg: error });
  }
});

router.post(
  "/addlike",
  tokenVerification,
  async (req: Request, res: Response) => {
    let user_id = req.body.user_id;
    let video_id = req.body.video_id;
    try {
      await dbQuery("INSERT into likes (video_id,user_id) values($1,$2)", [
        video_id,
        user_id,
      ]);
      res.send({ success: "Like added" });
    } catch (error) {
      res.status(400);
      res.send({ error: error });
    }
  }
);

router.post(
  "/removelike",
  tokenVerification,
  async (req: Request, res: Response) => {
    let user_id = req.body.user_id;
    let video_id = req.body.video_id;
    try {
      await dbQuery("DELETE from likes where user_id=$1 and video_id=$2", [
        user_id,
        video_id,
      ]);
      res.send({ success: "Like removed" });
    } catch (error) {
      res.status(400);
      res.send({ error: error });
    }
  }
);

router.post(
  "/adddislike",
  tokenVerification,
  async (req: Request, res: Response) => {
    let user_id = req.body.user_id;
    let video_id = req.body.video_id;
    try {
      await dbQuery("INSERT into dislikes (video_id,user_id) values($1,$2)", [
        video_id,
        user_id,
      ]);
      res.send({ success: "DisLike added" });
    } catch (error) {
      res.status(400);
      res.send({ error: error });
    }
  }
);

router.post(
  "/removedislike",
  tokenVerification,
  async (req: Request, res: Response) => {
    let user_id = req.body.user_id;
    let video_id = req.body.video_id;
    try {
      await dbQuery("DELETE from dislikes where user_id=$1 and video_id=$2", [
        user_id,
        video_id,
      ]);
      res.send({ success: "Dislike removed" });
    } catch (error) {
      res.status(400);
      res.send({ error: error });
    }
  }
);

export { router };
