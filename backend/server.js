const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const authRoutes = require('./routes/authRoutes');
const foodRoutes = require('./routes/foodRoutes');
const categoryRoutes = require('./routes/categoryRoutes');

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully!'))
  .catch(err => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

app.get('/', (req, res) => res.send('Food Inventory API Running'));

app.use('/api/auth', authRoutes);
app.use('/api/foods', foodRoutes);
app.use('/api/categories', categoryRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
