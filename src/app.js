const express = require("express");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const connectDB = require("./config/db");

// Conectar a MongoDB
connectDB();

const app = express();

// Configurar CORS
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));

app.use(express.json());

// Servir archivos estáticos
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Importar rutas
const adminAuthRoutes = require("./routes/adminAuthRoutes");
const adminProtectedRoutes = require("./routes/adminProtectedRoutes");
const productRoutes = require("./routes/productRoutes");
const providerRoutes = require("./routes/providerRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const orderRoutes = require("./routes/orderRoutes");
const clientAuthRoutes = require("./routes/clientAuthRoutes");

// Definir rutas
app.get('/', (req, res) => {
    res.send('🚀 Servidor Express funcionando en Vercel!');
});

app.use("/api/admin/auth", adminAuthRoutes);
app.use("/api/admin", adminProtectedRoutes);
app.use("/api/products", productRoutes);
app.use("/api/providers", providerRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/clientes", clientAuthRoutes);

// Ruta para obtener la configuración de PayPal
app.get("/api/config/paypal", (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID);
});

// Exportar la app para Vercel
module.exports = app;