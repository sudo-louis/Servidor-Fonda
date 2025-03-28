const express = require("express");
const { getProviders, createProvider, updateProvider, deleteProvider} = require("../controllers/providerController");
const verifyAdminToken = require("../middleware/adminAuthMiddleware");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

// router.post("/", verifyAdminToken, upload.single("image"), createProvider);
// router.get("/", verifyAdminToken,getProviders);
// router.post("/",verifyAdminToken,createProvider);
// router.put("/:id",verifyAdminToken, updateProvider);
// router.delete("/:id",verifyAdminToken, deleteProvider);

router.post("/", upload.single("image"), createProvider);
router.get("/", getProviders);
router.post("/",createProvider);
router.put("/:id",upload.single("image"),updateProvider);
router.delete("/:id",deleteProvider);
 
module.exports = router;