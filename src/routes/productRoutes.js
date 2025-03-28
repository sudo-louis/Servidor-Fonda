const verifyAdminToken = require("../middleware/adminAuthMiddleware");
const express = require("express");
const {getProducts,getSingleProduct, createProduct, updateProduct, deleteProduct  } = require("../controllers/productController");
const upload = require("../middleware/uploadMiddleware");

const router = express.Router();

router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getSingleProduct);
router.put("/:id",upload.single("image"), updateProduct);
router.delete("/:id", deleteProduct);

module.exports = router;