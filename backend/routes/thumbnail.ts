import express, { Request, Response } from "express";
import path from "path";
const router = express.Router();
const thubmnailDirectory = path.join(__dirname, "../uploads/thumbnails");

router.get("/:filename", (req, res) => {
  const fileName = req.params.filename;
  res.sendFile(path.join(thubmnailDirectory, fileName));
});

export { router };
