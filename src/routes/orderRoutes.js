const express = require("express");
const { 
  createOrder, 
  getOrder, 
  getSingleOrder, 
  updateOrder, 
  deleteOrder 
} = require("../controllers/orderController");
const protectRoutes = require('../Middleware/protectRoutes');

  
const router = express.Router();

router.post("/", protectRoutes,createOrder);
router.get("/", protectRoutes,getOrder);
router.get("/:id", protectRoutes,getSingleOrder);
router.put("/:id/payment",protectRoutes,updateOrder);
router.delete("/:id", protectRoutes, deleteOrder);

module.exports = router;