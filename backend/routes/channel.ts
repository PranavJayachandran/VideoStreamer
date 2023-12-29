import express, { Request, Response } from "express";
import { tokenVerification } from "../middleware/authorisation";
import { dbQuery } from "../db";
const router = express.Router();

router.post("/join", tokenVerification, async (req: Request, res: Response) => {
  console.log("joining");
  let member = req.body.user_id;
  let owner = req.body.channel_id;
  console.log(owner, member);
  try {
    await dbQuery("INSERT into channel (owner,member) values($1,$2)", [
      owner,
      member,
    ]);
    res.send({ success: "Joined the channel" });
  } catch (error) {
    res.send({ error: error });
  }
});

router.post(
  "/leave",
  tokenVerification,
  async (req: Request, res: Response) => {
    let member = req.body.user_id;
    let owner = req.body.channel_id;
    try {
      await dbQuery("DELETE from channel where owner=$1 and member=$2", [
        owner,
        member,
      ]);
      res.send({ success: "Left the channel" });
    } catch (error) {
      res.send({ error: error });
    }
  }
);

router.get("/", async (req: Request, res: Response) => {
  let owner = req.query.owner;
  try {
    let result = await dbQuery("Select count(*) from channel where owner= $1", [
      owner,
    ]);
    let numberofmembers = result[0].count;
    res.send({ numberofmembers });
  } catch (error) {
    res.send({ error: error });
  }
});

router.get(
  "/ismember",
  tokenVerification,
  async (req: Request, res: Response) => {
    let member = req.body.user_id;
    let owner = req.query.owner;
    try {
      let result = await dbQuery(
        "Select count(*) from channel where owner= $1 and member=$2",
        [owner, member]
      );
      console;
      let isMember = false;
      if (result[0].count > 0) isMember = true;
      res.send({ isMember });
    } catch (error) {
      console.log(error);
      res.send({ error: error });
    }
  }
);
export { router };
