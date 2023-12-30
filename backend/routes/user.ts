import express, { Request, Response } from "express";
import { dbQuery } from "../db";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { tokenVerification } from "../middleware/authorisation";
const router = express.Router();

router.post("/signup", async (req: Request, res: Response) => {
  let userName: String = req.body.username,
    passWord: String = req.body.password;

  //Check if the exact user exists
  let result = await dbQuery(
    "Select id from users where username = $1 and password = $2",
    [userName, passWord]
  );
  if (result.length > 0) {
    res.send({ msg: "User exists" });
  } else {
    //Check for other user with the same username
    result = await dbQuery("Select id from users where username = $1", [
      userName,
    ]);
    if (result.length > 0)
      res.send({ msg: "User with the same username exists" });
    else {
      let secret: string = "videoStreamer_secret_key";
      result = await dbQuery(
        "INSERT into users (username,password) values ($1,$2) returning id",
        [userName, passWord]
      );
      let token = jwt.sign(
        {
          data: {
            id: result[0].id,
          },
        },
        secret,
        { expiresIn: "1h" }
      );
      res.send({ token: token });
    }
  }
});

router.post("/login", async (req: Request, res: Response) => {
  let userName: String = req.body.username,
    passWord: String = req.body.password;

  //Check if the exact user exists
  let result = await dbQuery(
    "Select id from users where username = $1 and password = $2",
    [userName, passWord]
  );
  if (result.length == 0) {
    res.send({ msg: "Incorrect username or password" });
  } else {
    let secret: string = "videoStreamer_secret_key";
    let token = jwt.sign(
      {
        data: {
          id: result[0].id,
        },
      },
      secret,
      { expiresIn: "1h" }
    );

    res.send({ token: token });
  }
});

router.get(
  "/username",
  tokenVerification,
  async (req: Request, res: Response) => {
    let id = req.body.user_id;
    try {
      let userName = await dbQuery("Select username from users where id=$1", [
        id,
      ]);
      res.send({ username: userName[0].username, id: req.body.user_id });
    } catch (error) {
      console.error(error);
      res.send({ msg: "User not found" });
    }
  }
);

router.get(
  "/isauthenticated",
  tokenVerification,
  async (req: Request, res: Response) => {
    res.send({ msg: "Valid user" });
  }
);

export { router };
