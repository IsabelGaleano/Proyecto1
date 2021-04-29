const express = require('express');
let router = express.Router();

// --- Multer ---
const multer = require('multer');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads_preview');
  },
  filename: (req, file, cb) => {
    const fileExtension = file.mimetype.split('/')[1];
    cb(null, Math.random().toString().substring(2) + '.' + fileExtension);
  },
});

const upload = multer({
  storage: storage,
  limits: {
    fieldSize: 1024 * 1024 * 3,
  },
});
// -------------------------------------------------------

router.post('/', upload.single('imagen'), (req, res) => {
  res.json({ filename: req.file.filename });
});

module.exports = router;
