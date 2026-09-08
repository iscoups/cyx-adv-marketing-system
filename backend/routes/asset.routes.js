const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const controller = require('../controllers/asset.controller');

const router = express.Router();
const uploadDir = path.join(__dirname, '..', 'uploads');

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => {
    const safeName = `${Date.now()}-${file.originalname}`.replace(/\s+/g, '-');
    cb(null, safeName);
  }
});

const upload = multer({ storage });

router.get('/', controller.list);
router.post('/', controller.create);
router.post('/upload', upload.single('file'), controller.upload);
router.put('/:id', controller.update);
router.delete('/:id', controller.remove);

module.exports = router;
