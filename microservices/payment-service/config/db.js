const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    //await mongoose.connect(process.env.MONGO_URI);
    await mongoose.connect("mongodb+srv://iksipias:8nlx9WvTPNMkc0A0@cluster0.tzyfc.mongodb.net/finalcase-payment-service?retryWrites=true&w=majority&appName=Cluster0");
    console.log("MongoDB connected");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
