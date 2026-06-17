const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const customerRoutes = require('./routes/CustomerRoutes');

const app = express();
const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => console.log('backendCRUD connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error in backendCRUD:', err));

// Montar rutas RESTful de clientes
app.use('/computerstore/customer', customerRoutes);

app.listen(PORT, () => {
  console.log(`backendCRUD running on port ${PORT}`);
});
