const express = require('express');
const { dbQuery } = require('../db');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: "./uploads/thubmnails",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.use(express.json())
router.post("/upload", upload.single('thumbnail'), (req, res) => {
    const imageName = req.file ? req.file.filename : null;
    console.log(imageName);
    dbQuery("INSERT into metadata (title, description, user_id, originalVideoStorage,thumbnail) values ($1,$2,$3,$4,$5) returning id", [req.body.title, req.body.description, req.body.user_id, "output.mpd", imageName]);
    res.send(req.body);
})
router.get("/", async (req, res) => {
    res.send(await dbQuery("SELECT * from metadata"));
})

module.exports = router;