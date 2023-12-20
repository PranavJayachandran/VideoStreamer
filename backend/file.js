const fs = require('fs');
const uploadVideo = (file, filename) => {
    if (!fs.existsSync("uploads/videos/" + filename)) {
        fs.writeFileSync("uploads/videos" + filename, file.buffer);
    }
    else
        fs.appendFileSync("uploads/videos/" + filename, file.buffer);
    console.log('Received chunk:', {
        originalname: file.originalname,
        mimetype: file.mimetype,
        size: file.size,
    }, file);
}


module.exports = { uploadVideo };