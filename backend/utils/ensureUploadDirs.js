const fs = require("fs");

const ensureUploadDirs = () => {
  const uploadDirs = ["uploads/profile", "uploads/product"];
  uploadDirs.forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });
};

module.exports = ensureUploadDirs;
