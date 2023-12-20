const express = require('express');
const { insertMetadata } = require('../db');
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
    const imagePath = req.file ? `/uploads/images/${req.file.filename}` : null;
    console.log(imagePath);
    insertMetadata("INSERT into metadata (title, description, user_id) values ($1,$2,$3) returning id", [req.body.title, req.body.description, req.body.user_id]);
    res.send(req.body);
})

module.exports = router;