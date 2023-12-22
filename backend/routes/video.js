const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { transcode } = require('../publisher');
const videoDirectory = path.join(__dirname, 'videos');
const storage = multer.diskStorage({
    destination: "./uploads/videos",
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});
const upload = multer({ storage: storage });

router.get('/:filename', (req, res) => {
    const fileName = req.params.filename;
    console.log(fileName)
    const filePath = path.join(videoDirectory, "../../videos/" + fileName);
    res.sendFile(filePath);
});

router.post("/upload/:filename", upload.single('video'), (req, res) => {
    const file = req.file;
    if (!file) {
        return res.status(400).send('No file uploaded.');
    }
    const videoName = req.file ? req.file.filename : null;
    console.log(videoName);
    transcode({ fileName: videoName, id: req.body.id });
    res.status(200).send('Chunk received successfully');
});

router.post("/", (req, res) => {

})

module.exports = router;