import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
const tokenVerification = (req: Request, res: Response, next: NextFunction) => {
  const authorizationHeader = req.headers.authorization;
  if (!authorizationHeader) {
    return res
      .status(401)
      .json({ message: "Unauthorized - No token provided" });
  }

  const parts = authorizationHeader.split(" ");

  if (parts.length !== 2 || parts[0] !== "Bearer") {
    return res
      .status(401)
      .json({ message: "Unauthorized - Invalid token format" });
  }

  const token = parts[1];
  let secret: string = "videoStreamer_secret_key";
  jwt.verify(token, secret, function (err, decoded: any) {
    if (err || !decoded)
      return res.status(401).json({ message: "Unauthorised" });
    else {
      req.body.user_id = decoded.data.id;
      next();
    }
  });
};

export { tokenVerification };
