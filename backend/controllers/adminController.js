const adminService = require("../services/adminService");

exports.addAdmin = async (req, res) => {
    try {
        const { userId } = req.body;
        const admin = await adminService.addAdmin(userId);
        res.status(200).json({ message: "User is now an admin", admin });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.removeAdmin = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await adminService.removeAdmin(userId);
        res.status(200).json({ message: "Admin privileges removed", user });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.listAdmins = async (req, res) => {
    try {
        const admins = await adminService.listAdmins();
        if (admins.length === 0) {
            return res.status(404).json({ message: "No admins found" });
        }
        res.status(200).json(admins);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
