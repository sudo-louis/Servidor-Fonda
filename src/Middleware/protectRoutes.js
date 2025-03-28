// const jwt = require('jsonwebtoken');
// const Client = require('../models/ClientModel');

// const protectRoutes = async (req, res, next) => {
//     let token;

//     if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
//         try {
//             token = req.headers.authorization.split(' ')[1];
//             const decoded = jwt.verify(token, process.env.JWT_SECRET);
//             req.client = await Client.findById(decoded.id).select('-password');
//             if (!req.client) {
//                 return res.status(401).json({ message: 'Token inválido, usuario no encontrado' });
//             }
//             next();
//         } catch (error) {
//             return res.status(401).json({ message: 'Token inválido' });
//         }
//     }

//     if (!token) {
//         return res.status(401).json({ message: 'Acceso no autorizado, no se envió un token' });
//     }
// };

// module.exports = protectRoutes;
const jwt = require('jsonwebtoken');
const Client = require('../models/ClientModel');

const protectRoutes = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            
            // Cambiar req.client a req.user para consistencia
            req.user = await Client.findById(decoded.id).select('-password');
            
            if (!req.user) {
                return res.status(401).json({ message: 'Token inválido, usuario no encontrado' });
            }
            next();
        } catch (error) {
            return res.status(401).json({ message: 'Token inválido' });
        }
    }

    if (!token) {
        return res.status(401).json({ message: 'Acceso no autorizado, no se envió un token' });
    }
};

module.exports = protectRoutes;