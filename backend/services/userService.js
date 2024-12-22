const User = require("../models/User");

class UserService {
  async registerUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async updateUser(userId, userData) {
    return await User.findByIdAndUpdate(userId, userData, { new: true });
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

}

module.exports = new UserService();
