const express = require("express");
const multer = require("multer");
const fs = require('fs');
const app = express();
const S3 = require('aws-sdk/clients/s3');

const bucketName = 'ciquence-app'
const region = 'us-east-1'
const accessKeyId = 'AKIAYH6HEQTW7QURCTMP'
const secretAccessKey = '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'

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
})

const getFile = (fileKey) => {
  const downloadParams = {
    Key: fileKey,
    Bucket: bucketName,
  }
  return s3.getObject(downloadParams).createReadStream()
}

const port = 3000;

const upload = multer({ dest: "uploads/" });

app.get("/", (req, res) => {
  res.send({ message: "welcome ...." });
});

app.post("/upload", upload.single("audio"), (req, res) => {
  fs.renameSync(`${__dirname}/uploads/${req.file.filename}`,`${__dirname}/uploads/${req.file.filename}.mp3`)
  console.log(req.body)
  res.send({ data: `${req.file.filename}.mp3` });
});

app.get("/get/:filename", (req, res) => {
    const readStream = getFile(req.params.filename);
    readStream.pipe(res);
    // const filename = `${__dirname}/uploads/${req.params.filename}`
    // const file =  fs.createReadStream(filename);
    // file.pipe(res)
});

app.listen(port, () => {
  console.log("App listening on port ");
});
