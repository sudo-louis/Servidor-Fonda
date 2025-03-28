const Client = require('../models/ClientModel');
const fs = require('fs');
const path = require('path');

exports.getClientProfile = async (req, res) => {
    try {
        res.json(req.client);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateClientProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        let client = await Client.findById(req.client._id);

        if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

        client.name = name || client.name;
        client.email = email || client.email;
        if (password) client.password = password;

        if (req.file) {
            if (client.photo) {
                const oldPhotoPath = path.join(__dirname, '../uploads/clients', client.photo);
                if (fs.existsSync(oldPhotoPath)) fs.unlinkSync(oldPhotoPath);
            }
            client.photo = req.file.filename;
        }

        await client.save();
        res.json({ message: 'Perfil actualizado', client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.deleteClient = async (req, res) => {
    try {
        if (req.client.photo) {
            const photoPath = path.join(__dirname, '../uploads/clients', req.client.photo);
            if (fs.existsSync(photoPath)) fs.unlinkSync(photoPath);
        }

        await Client.findByIdAndDelete(req.client._id);
        res.json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};