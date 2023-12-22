const express = require('express');
const { dbQuery } = require('../db');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: "./uploads/thumbnails",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.use(express.json())
router.post("/upload", upload.single('thumbnail'), async (req, res) => {
    const imageName = req.file ? req.file.filename : null;
    console.log(imageName);
    const id = await dbQuery("INSERT into metadata (title, description, user_id, originalVideoStoragepath,thumbnail) values ($1,$2,$3,$4,$5) returning id", [req.body.title, req.body.description, req.body.user_id, "output.mpd", imageName]);
    console.log(id)
    res.send(id);
})
router.get("/", async (req, res) => {
    let data = [];
    let temp = await dbQuery("SELECT * from metadata");
    for (let i = 0; i < 20; i++) {
        data.push(temp[0]);
        data.push(temp[1]);
    }
    console.log(data);
    res.send(data);
})

module.exports = router;