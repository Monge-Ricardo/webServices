const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dns = require('dns');

// Configurar servidores DNS públicos para evitar problemas de resolución SRV en Windows (ECONNREFUSED)
dns.setServers(['8.8.8.8', '1.1.1.1']);

require('dotenv').config({ path: path.join(__dirname, '.env') });

const microphoneRoutes = require('./routes/MicrophoneRoutes');

const app = express();
const PORT = process.env.PORT || 4001;
const MONGODB_URI = process.env.MONGODB_URI;

app.use(cors());
app.use(express.json());

// Conectar a MongoDB Atlas
mongoose.connect(MONGODB_URI)
  .then(() => console.log('backendCRUD connected to MongoDB Atlas'))
  .catch(err => console.error('MongoDB connection error in backendCRUD:', err));

// Montar rutas de micrófonos para la tienda songsyou
app.use('/songsyou/microphones', microphoneRoutes);

app.listen(PORT, () => {
  console.log(`backendCRUD running on port ${PORT}`);
});
