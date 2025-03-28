const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (!token) return res.status(401).json({ message: 'Acceso denegado, token no proporcionado' });

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.client = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: 'Token inválido' });
    }
};