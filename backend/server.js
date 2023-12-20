const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');


const app = express();
const port = 3001;
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());




const videoDirectory = path.join(__dirname, 'videos');

const videoRoutes = require("./routes/video");
const metadataRoutes = require("./routes/metadata");
app.use(express.static(path.dirname(videoDirectory)));



//Streaming logic
app.use("/video", videoRoutes);
app.use("/metadata", metadataRoutes);


app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
