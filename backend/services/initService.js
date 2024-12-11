const User = require("../models/User");

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
        password: defaultAdminPassword,
        role: "admin",
      });
      await admin.save();
      console.log("Default admin account created.");
    }
  } catch (error) {
    console.error("Error during default admin initialization:", error);
    throw error; // Hata fırlat
  }
};

module.exports = { initAdmin };