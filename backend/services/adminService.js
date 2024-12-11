const User = require("../models/User");

class AdminService {
    async addAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Admin rolünü ata
        user.role = "admin";
        await user.save();
        return user;
    }

    async removeAdmin(userId) {
        const user = await User.findById(userId);
        if (!user) {
            throw new Error("User not found");
        }

        // Kullanıcı rolünü geri al
        user.role = "user";
        await user.save();
        return user;
    }

    async listAdmins() {
        const admins = await User.find({ role: "admin" });
        return admins;
    }
}

module.exports = new AdminService();
