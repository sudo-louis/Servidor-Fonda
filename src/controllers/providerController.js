const Provider = require("../models/ProviderModel");

// Obtener todos los proveedores
const getProviders = async (req, res) => {
    try {
        const providers = await Provider.find();
        res.json(providers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Crear un proveedor
const createProvider = async (req, res) => {
    try {
        const { name, contact } = req.body;
        const image = req.file ? req.file.filename : null;

        const newProvider = new Provider({ name, contact, image });
        await newProvider.save();
        
        res.status(201).json({ message: "Proveedor creado", provider: newProvider });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Actualizar un proveedor
const updateProvider = async (req, res) => {
    try {
        const { name, contact } = req.body;
        let image = req.file ? req.file.filename : undefined;

        // Obtener el proveedor actual para conservar la imagen si no se envía una nueva
        const existingProvider = await Provider.findById(req.params.id);
        if (!existingProvider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        // Si no se proporciona una nueva imagen, mantener la actual
        if (!image) {
            image = existingProvider.image;
        }

        const updatedProvider = await Provider.findByIdAndUpdate(
            req.params.id, 
            { name, contact, image }, 
            { new: true }
        );

        res.json({ message: "Proveedor actualizado", provider: updatedProvider });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


// Eliminar un proveedor
const deleteProvider = async (req, res) => {
    try {
        const deletedProvider = await Provider.findByIdAndDelete(req.params.id);
        if (!deletedProvider) {
            return res.status(404).json({ message: "Proveedor no encontrado" });
        }

        res.json({ message: "Proveedor eliminado" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getProviders, createProvider, updateProvider, deleteProvider };