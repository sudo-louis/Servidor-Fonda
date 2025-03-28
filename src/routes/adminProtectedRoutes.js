const express = require("express");
const verifyAdminToken = require("../middleware/adminAuthMiddleware");

const router = express.Router();

router.get("/dashboard", verifyAdminToken, (req, res) => {
    res.json({ message: "Bienvenido al panel de administración" });
});

module.exports = router;