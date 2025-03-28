const Order = require("../models/OrderModel");
const Product = require("../models/ProductModel");

// @desc    Crear nueva orden
// @route   POST /api/orders
// @access  Private
const createOrder = async (req, res) => {
  try {
    const {
      // orderItems,
      // paymentMethod,
      // taxPrice, 
      // shippingPrice,
      // totalPrice,

      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,

    } = req.body;

    if (orderItems && orderItems.length === 0) {
      res.status(400);
      throw new Error("No hay items en la orden");
    }

    // Verificar disponibilidad de productos
    for (const item of orderItems) {
      const product = await Product.findById(item.product);
      if (!product) {
        res.status(404);
        throw new Error(`Producto no encontrado: ${item.name}`);
      }
    }

    console.log("Usuario que crea la orden:", req.user._id); // Para depuración

    const order = new Order({
      user: req.user._id,
      orderItems,
      shippingAddress,
      paymentMethods,
      shippingPrice,
      taxPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);

  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error al crear la orden" 
    });
    console.log(error)
  }
};

// @desc    Obtener órdenes del usuario
// @route   GET /api/orders
// @access  Private
const getOrder = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error al obtener las órdenes" 
    });
  }
};


const getSingleOrder = async(req,res)=>{
  try {
    const order = await Order.findById(req.params.id).populate(
      "user",
      "name email"
    );
    res.status(200).json(order);

  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error al obtener la orden" 
    });
  }
}




// @desc    Actualizar orden a pagada (PayPal)
// @route   PUT /api/orders/:id/payment
// @access  Private
const updateOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Orden no encontrada");
    }

    if (order.user.toString() !== req.user._id.toString()) {
      res.status(401);
      throw new Error("No autorizado");
    }

    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.email_address,
    };

    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);

  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error al actualizar la orden" 
    });
  }
};

// @desc    Eliminar orden
// @route   DELETE /api/orders/:id
// @access  Private/Admin
const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);

    if (!order) {
      res.status(404);
      throw new Error("Orden no encontrada");
    }

    // Solo admin o el usuario dueño puede eliminar
    if (req.user.isAdmin || order.user.toString() === req.user._id.toString()) {
      await order.remove();
      res.status(200).json({ message: "Orden eliminada" });
    } else {
      res.status(401);
      throw new Error("No autorizado");
    }

  } catch (error) {
    res.status(500).json({ 
      message: error.message || "Error al eliminar la orden" 
    });
  }
};

module.exports = {
  createOrder,
  getOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
};