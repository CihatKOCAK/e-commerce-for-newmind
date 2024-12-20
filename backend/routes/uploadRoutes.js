const express = require("express");
const {fileUploadService} = require("../services/fileUploadService");

const router = express.Router();

router.get("/:fileName",fileUploadService.getFile, (req, res) => {
  const { fileName } = req.params;
    if (!fileName) {
      return res.status(400).json({ success: false, message: "File name is required" });
    }
    res.status(200).json({ success: true, message: "File found", fileName });
});
  
// Dosya yükleme rotası
router.post("/:type", fileUploadService.upload, (req, res) => {
  const { type } = req.params;
  if (!type) {
    return res.status(400).json({ success: false, message: "Type is required" });
  }
  res.status(200).json({
    success: true,
    message: "File uploaded successfully",
    filePath: req.file.path,
  });
});

module.exports = router;
