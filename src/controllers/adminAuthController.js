const Admin = require("../models/AdminModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) {
        return res.status(401).json({ message: "Credenciales inválidas correo" });
        }

        const isMatch = await bcrypt.compare(password, admin.password);
        if (!isMatch) {
        return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }
};

const logoutAdmin = async (req, res) => {
    try {
        res.json({ message: "Logout exitoso" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { loginAdmin, logoutAdmin };