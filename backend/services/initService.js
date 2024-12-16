const User = require("../models/User");
const { hashPassword } = require("../utils/hashUtils");
const { logInfo, logError } = require("../utils/loggerUtil");

const initAdmin = async () => {
  // Gerekli environment değişkenlerini kontrol et
  if (!process.env.DEFAULT_ADMIN_EMAIL || !process.env.DEFAULT_ADMIN_PASSWORD) {
    throw new Error("Missing required environment variables: DEFAULT_ADMIN_EMAIL or DEFAULT_ADMIN_PASSWORD");
  }

  const defaultAdminEmail = process.env.DEFAULT_ADMIN_EMAIL;
  const defaultAdminPassword = process.env.DEFAULT_ADMIN_PASSWORD;

  try {
    // Admin hesabını kontrol et
    let admin = await User.findOne({ email: defaultAdminEmail });
    if (!admin) {
      // Eğer admin yoksa, oluştur
      admin = new User({
        name: "Admin",
        email: defaultAdminEmail,
        password: await hashPassword(defaultAdminPassword),
        role: "admin",
      });
      await admin.save();
      logInfo("initAdmin", "Default admin created successfully" + defaultAdminEmail);
    }
  } catch (error) {
    logError("initAdmin", `Default admin creation failed: ${error.message}`);
    throw error; // Hata fırlat
  }
};

module.exports = { initAdmin };
