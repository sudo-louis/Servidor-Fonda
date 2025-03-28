const express = require("express");
const { getCategories, createCategory, updateCategory, deleteCategory } = require("../controllers/categoryController");
const verifyAdminToken = require("../middleware/adminAuthMiddleware");

const router = express.Router();

router.get("/", verifyAdminToken,getCategories);
router.post("/",verifyAdminToken,createCategory);
router.put("/:id",verifyAdminToken,updateCategory);
router.delete("/:id",verifyAdminToken,deleteCategory);
 
module.exports = router;