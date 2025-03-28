require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Admin = require('../src/models/AdminModel'); // Ajusta la ruta según la ubicación de tu modelo

// Conexión a la base de datos
mongoose.connect(process.env.MONGO_URI, { 
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log('Conectado a la base de datos'))
.catch((err) => console.error('Error al conectar la base de datos:', err));

// Datos de administradores
const admins = [
    {
        username: 'admin1',
        email: 'admin1@example.com',
        password: bcrypt.hashSync('password123', 10)
    },
    {
        username: 'admin2',
        email: 'admin2@example.com',
        password: bcrypt.hashSync('password456', 10)
    },
    {
        username: 'admin3',
        email: 'admin3@example.com',
        password: bcrypt.hashSync('password789', 10)
    }
];

// Insertar los administradores
const seedAdmins = async () => {
    try {
        await Admin.deleteMany(); // Elimina todos los documentos previos (opcional)
        await Admin.insertMany(admins);
        console.log('Administradores insertados correctamente.');
        mongoose.disconnect(); // Cierra la conexión
    } catch (error) {
        console.error('Error al insertar administradores:', error);
        mongoose.disconnect();
    }
};

seedAdmins();
