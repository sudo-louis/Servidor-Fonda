const express = require("express");
const { loginAdmin, logoutAdmin } = require("../controllers/adminAuthController");

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/logout", logoutAdmin);

module.exports = router;