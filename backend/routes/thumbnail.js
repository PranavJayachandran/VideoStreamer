const express = require('express');
const router = express.Router()
const path = require('path');
const thubmnailDirectory = path.join(__dirname, "../uploads/thumbnails");

router.get("/:filename", (req, res) => {
    const fileName = req.params.filename;
    res.sendFile(path.join(thubmnailDirectory, fileName));
})

module.exports = router;