// backend/middleware/auth.js

const jwt = require('jsonwebtoken');

module.exports = function (req, res, next) {
    // Ambil token dari header Authorization (standard Bearer Token)
    const authHeader = req.header('Authorization');
    
    // Cek jika tidak ada header atau format tidak sesuai 'Bearer <token>'
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ msg: 'No token, authorization denied (Missing Bearer Token)' });
    }

    // Ekstrak token (hapus 'Bearer ')
    const token = authHeader.split(' ')[1]; 
    
    // Cek jika token kosong
    if (!token) {
        return res.status(401).json({ msg: 'No token, authorization denied' });
    }

    // Verifikasi token
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        req.user = decoded.user;
        next(); 
    } catch (err) {
        res.status(401).json({ msg: 'Token is not valid' });
    }
};