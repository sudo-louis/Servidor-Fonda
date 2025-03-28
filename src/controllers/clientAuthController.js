const Client = require('../models/ClientModel');
const jwt = require('jsonwebtoken');
const fs = require('fs');

exports.registerClient = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingClient = await Client.findOne({ email });

        if (existingClient) return res.status(400).json({ message: 'Correo ya registrado' });

        const photo = req.file ? req.file.filename : null;

        const client = new Client({ name, email, password, photo });
        await client.save();

        res.status(201).json({ message: 'Cliente registrado exitosamente', client });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginClient = async (req, res) => {
    try {
        const { email, password } = req.body;

        const client = await Client.findOne({ email: email.toLowerCase() });
        if (!client) {
            return res.status(401).json({ message: "Correo inválido" });
        }

        const isMatch = await client.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: "Contraseña inválida" });
        }

        const token = jwt.sign({ id: client._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        res.json({ token });

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error);
    }
};

exports.logoutClient = (req, res) => {
    try {
        res.status(200).json({ message: 'Sesión cerrada exitosamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.getClientProfile = async (req, res) => {
    try {
        const client = await Client.findById(req.user._id).select('-password');
        if (!client) {
            return res.status(404).json({ 
                success: false,
                message: 'Cliente no encontrado' 
            });
        }
        
        res.json({ 
            success: true,
            client: {
                _id: client._id,
                name: client.name,
                email: client.email,
                // Agrega otros campos necesarios
                createdAt: client.createdAt,
                updatedAt: client.updatedAt
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};

exports.updateClientProfile = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const client = await Client.findById(req.user._id);

        if (!client) {
            return res.status(404).json({ 
                success: false,
                message: 'Cliente no encontrado' 
            });
        }

        // Actualizar campos
        client.name = name || client.name;
        client.email = email || client.email;
        if (password) client.password = password;

        const updatedClient = await client.save();

        // Devuelve los datos actualizados sin la contraseña
        res.json({ 
            success: true,
            message: 'Perfil actualizado',
            client: {
                _id: updatedClient._id,
                name: updatedClient.name,
                email: updatedClient.email,
                token: req.user.token // Si necesitas mantener el mismo token
            }
        });
    } catch (error) {
        res.status(500).json({ 
            success: false,
            message: error.message 
        });
    }
};
  
// Controlador
exports.deleteClient = async (req, res) => {
    try {
        const client = await Client.findByIdAndDelete(req.params.id);
        console.log('Ruta DELETE /profile/:id alcanzada', req.params.id);
        if (!client) {

            return res.status(404).json({ message: 'Cliente no encontrado' });
        }
        res.json({ message: 'Cuenta eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};