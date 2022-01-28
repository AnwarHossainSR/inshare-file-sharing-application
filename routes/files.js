const router = require("express").Router();
const multer = require("multer");
const path = require("path");
const File = require("../model/file");

let storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => {
    const uniqueName = `${Date.now()}-${Math.round(
      Math.random() * 1e9
    )}${path.extname(file.originalname)}`;
    cb(null, uniqueName);
  },
});
let upload = multer({ storage, limits: { fileSize: 1000000 * 100 } }).single(
  "myfile"
); //100mb

router.post("/", (req, res) => {
  if (!req.file) {
    return res.status(422).send({ error: "All fields are required." });
  }
  upload(req, res, async (err) => {
    //validation
    if (err) {
      return res.status(500).send({ error: err.message });
    }
    //store file to database
    const file = new File({
      filename: req.file.filename,
      uuid: uuidv4(),
      path: req.file.path,
      size: req.file.size,
    });
    const response = await file.save();
    //return response
    res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}` });
  });
});

module.exports = router;
