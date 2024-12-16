const mongoose = require("mongoose");
const { logInfo, logError } = require("../utils/loggerUtil");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    logInfo("dbConnection", `MongoDB connected: ${mongoose.connection.host}`);
  } catch (error) {
    logError("dbConnection", `MongoDB connection failed: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectDB;
