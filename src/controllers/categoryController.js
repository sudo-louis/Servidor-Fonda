const Category = require("../models/CategoryModel");

// Obtener todas las categorías
const getCategories = async (req, res) => {
    try {
        const categories = await Category.find();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear una categoría
const createCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const newCategory = new Category({ name });
        await newCategory.save();
        
        res.status(201).json({ message: "Categoría creada", category: newCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar una categoría
const updateCategory = async (req, res) => {
    try {
        const { name } = req.body;
        const updatedCategory = await Category.findByIdAndUpdate(req.params.id, 
            { name }, { new: true });

        if (!updatedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría actualizada", category: updatedCategory });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Eliminar una categoría
const deleteCategory = async (req, res) => {
    try {
        const deletedCategory = await Category.findByIdAndDelete(req.params.id);
        if (!deletedCategory) {
            return res.status(404).json({ message: "Categoría no encontrada" });
        }

        res.json({ message: "Categoría eliminada" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getCategories, createCategory, updateCategory, deleteCategory };