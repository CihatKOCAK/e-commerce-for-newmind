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

      res.status(201).json({ message: "User registered successfully", user });
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

      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" });
      res.status(200).json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
