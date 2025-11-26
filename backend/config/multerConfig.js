// backend/config/multerConfig.js

const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Pastikan direktori 'uploads' ada (penting untuk pertama kali run)
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
    console.log(`Created uploads directory at: ${uploadDir}`);
}

const storage = multer.diskStorage({
  // Tentukan folder tujuan
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  // Tentukan nama file yang unik
  filename: function (req, file, cb) {
    // Nama file: foodName-timestamp.ext
    const foodName = req.body.name ? req.body.name.replace(/\s/g, '_') : 'file';
    cb(null, foodName + '-' + Date.now() + path.extname(file.originalname));
  }
});

// Inisialisasi Multer
const upload = multer({ 
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 } // Batas ukuran file 5MB
});

module.exports = upload;