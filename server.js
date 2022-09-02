const express = require("express");
const multer = require("multer");
const fs = require('fs');
const app = express();

const port = 3000;

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send({ message: "welcome ...." });
});

app.post("/upload", upload.single("audio"), (req, res) => {
  fs.renameSync(`${__dirname}/uploads/${req.file.filename}`,`${__dirname}/uploads/${req.file.filename}.mp3`)
  res.send({ data: `${req.file.filename}.mp3` });
});

app.get("/get/:filename", (req, res) => {
    const filename = `${__dirname}/uploads/${req.params.filename}`
    const file =  fs.createReadStream(filename);
    file.pipe(res)
});

app.listen(port, () => {
  console.log("App listening on port ");
});
