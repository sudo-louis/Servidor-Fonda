const Product = require("../models/ProductModel");
const mongoose = require("mongoose");

// Obtener todos los productos
const getProducts = async (req, res) => {
    try {
        const products = await Product.find().populate("category provider");
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const getSingleProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
          res.json(product);
        }

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
 
// Crear un producto
const createProduct = async (req, res) => {
    try {
      const { name, price, category, provider } = req.body;
      const image = req.file ? req.file.filename : null;
  
      // Verificar que todos los campos estén completos
      if (!name || !price || !category || !provider) {
        return res.status(400).json({ message: "Faltan campos obligatorios" });
      }
  
      // Convertir price a número
      const parsedPrice = Number(price);
      if (isNaN(parsedPrice)) {
        return res.status(400).json({ message: "El precio debe ser un número válido" });
      }
  
      // Verificar si category y provider son ObjectId válidos
      if (!mongoose.Types.ObjectId.isValid(category) || !mongoose.Types.ObjectId.isValid(provider)) {
        return res.status(400).json({ message: "Categoría o proveedor no son válidos" });
      }
  
      const newProduct = new Product({ 
        name, 
        price: parsedPrice, 
        category: new mongoose.Types.ObjectId(category), 
        provider: new mongoose.Types.ObjectId(provider), 
        image 
      });
  
      await newProduct.save();
      res.status(201).json({ message: "Producto creado", product: newProduct });
    } catch (error) {
      console.error("Error en createProduct:", error);
      res.status(500).json({ message: error.message });
    }
  };
  

// Actualizar un producto
const updateProduct = async (req, res) => {
    try {
        const { name, price } = req.body;
        const image = req.file ? req.file.filename : null;

        // Verificar si se proporciona al menos un campo válido
        if (!name && !price && !image) {
            return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar" });
        }

        // Crear objeto con los campos a actualizar
        const updateData = {};
        if (name) updateData.name = name;
        if (price) updateData.price = price;
        if (image) updateData.image = image;

        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            updateData,
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto actualizado", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Eliminar un producto
const deleteProduct = async (req, res) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            return res.status(404).json({ message: "Producto no encontrado" });
        }

        res.json({ message: "Producto eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProducts, getSingleProduct, createProduct, updateProduct, deleteProduct };