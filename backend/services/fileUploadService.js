const multerConfig = require("../config/multerConfig");
const path = require("path");
const uploadFile = multerConfig.single("file");

const fileUploadService = {
  upload: (req, res, next) => {
    uploadFile(req, res, (err) => {
      if (err) {
        return res.status(400).json({ success: false, message: err.message });
      }
      next();
    });
  },

    getFile: (req, res) => {
      const { fileName } = req.params;
      const filePath = path.join(__dirname, "../uploads", fileName); // profile dizini
      console.log("File Path:", filePath); // Dosya yolunu kontrol et
  
      res.sendFile(filePath, (err) => {
        if (err) {
          console.error("Error sending file:", err);
          return res.status(404).json({ success: false, message: "File not found" });
        }
      });
    },
};



module.exports = { fileUploadService };
