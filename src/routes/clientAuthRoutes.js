const express = require('express');
const protectRoutes = require('../Middleware/protectRoutes');

const { registerClient, loginClient, logoutClient,getClientProfile, updateClientProfile, deleteClient } = require('../controllers/clientAuthController');
const uploadMiddleware = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', uploadMiddleware.single('photo'), registerClient);
router.post('/login', loginClient);
router.post('/logout', logoutClient);

router.get('/profile', protectRoutes, getClientProfile);
router.put('/profile', protectRoutes, uploadMiddleware.single('photo'), updateClientProfile);
router.delete('/profile/:id', protectRoutes, deleteClient);


module.exports = router;