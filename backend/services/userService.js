const User = require("../models/User");

class UserService {
  async registerUser(userData) {
    const user = new User(userData);
    return await user.save();
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }
}

module.exports = new UserService();
