const fileUploadService = require("../services/fileUploadService");
const userService = require("../services/userService");
const { hashPassword, comparePassword } = require("../utils/hashUtils");
const jwt = require("jsonwebtoken");

class UserController {
  async register(req, res) {
    try {
      const { name, email, password } = req.body;
      const existingUser = await userService.findUserByEmail(email);
      if (existingUser) return res.status(400).json({ message: "Email already exists" });

      const hashedPassword = await hashPassword(password);
      const user = await userService.registerUser({ name, email, password: hashedPassword });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });

      res.status(201).json({ message: "User registered successfully", user, token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await userService.findUserByEmail(email);

      if (!user) return res.status(404).json({ message: "User not found" });

      const isPasswordValid = await comparePassword(password, user.password);
      if (!isPasswordValid) return res.status(401).json({ message: "Invalid credentials" });

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
      res.status(200).json({ token,  user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getUserProfile(req, res) {
    try {
      const user = await userService.findUserById(req.user.id);

      if (!user) return res.status(404).json({ message: "User not found" });

      res.status(200).json({ user });

    }
    catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async updateUserProfile(req, res) {
      try {
        const { userId } = req.params; // URL parametresinden userId al
        const userData = req.body; 
        const updatedUser = await userService.updateUser(userId, userData);
        res.status(200).json({ message: "User updated successfully", user: updatedUser });

      }
      catch (error) {
        res.status(500).json({ error: error.message });
      }
    }
}

module.exports = new UserController();
