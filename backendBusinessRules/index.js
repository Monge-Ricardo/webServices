const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const businessRulesRoutes = require('./routes/BusinessRulesRoutes');

const app = express();
const PORT = process.env.PORT || 4002;

app.use(cors());
app.use(express.json());

// Montar rutas de reglas de negocio en la estructura requerida
app.use('/computerstore/customer', businessRulesRoutes);

app.listen(PORT, () => {
  console.log(`backendBusinessRules running on port ${PORT}`);
});
