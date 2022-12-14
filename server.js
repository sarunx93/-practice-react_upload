const express = require("express");
const fileUpload = require("express-fileupload");
const app = express();

app.use(fileUpload());
app.use(express.json());
app.post("/upload", (req, res) => {
  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  const file = req.files.file;
  const { caption } = req.body;
  file.mv(`${__dirname}/client/public/uploads/${file.name}`, (err) => {
    if (err) {
      console.log(err);
      return res.status(500).send(err);
    }
  });
  res.json({
    fileName: file.name,
    filePath: `/uploads/${file.name}`,
    caption,
  });
});
app.listen(5000, () => console.log("server started"));
