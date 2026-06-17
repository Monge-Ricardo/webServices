const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const microphoneRoutes = require('./routes/MicrophoneRoutes');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Montar rutas de micrófonos para la tienda songsyou
app.use('/songsyou/microphones', microphoneRoutes);

app.listen(PORT, () => {
  console.log(`backendBusinessRules running on port ${PORT}`);
});
