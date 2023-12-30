import express, { Request, Response, response } from "express";
import { dbQuery } from "../db";
import { tokenVerification } from "../middleware/authorisation";
const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
  let video_id = req.query.video_id;
  try {
    let response = await dbQuery(
      "SELECT * from (SELECT * from comments where video_id=$1) as temp ,(SELECT username,id as td from users) as users where users.td=temp.user_id",
      [video_id]
    );
    res.send(response);
  } catch (error) {
    res.send({ error });
  }
});
router.post("/add", tokenVerification, async (req: Request, res: Response) => {
  let video_id = req.body.video_id;
  let comment = req.body.comment;
  let comment_id = req.body.comment_id;
  let user_id = req.body.user_id;
  try {
    let response = await dbQuery(
      "INSERT into comments (comment,video_id,user_id,comment_id) values($1,$2,$3,$4)  returning id",
      [comment, video_id, user_id, comment_id]
    );
    res.send(response[0]);
  } catch (error) {
    res.send({ error });
  }
});

router.post(
  "/delete",
  tokenVerification,
  async (req: Request, res: Response) => {
    let comment_id = req.body.comment_id;
    let user_id = req.body.user_id;
    try {
      let response = await dbQuery(
        "DELETE from comments where id=$1 and user_id=$2",
        [comment_id, user_id]
      );
      res.send(response);
    } catch (error) {
      res.send({ error });
    }
  }
);

export { router };
