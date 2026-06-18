const axios = require('axios');
const Microphone = require('../models/Microphone');

const CRUD_MICROPHONES_URL = 'http://localhost:4001/songsyou/microphones';

// Crear micrófono evaluando la regla de negocio
exports.createWithBusinessRule = async (req, res) => {
  try {
    // 1. Obtener todos los micrófonos actuales de la tienda songsyou
    const getResponse = await axios.get(CRUD_MICROPHONES_URL);
    const rawMicrophones = getResponse.data;

    const microphones = rawMicrophones.map(m => new Microphone(m));

    // 2. Contar de 'plastic' y 'iron'
    let plasticCount = 0;
    let ironCount = 0;

    microphones.forEach(m => {
      if (m.material === 'plastic') {
        plasticCount++;
      } else if (m.material === 'iron') {
        ironCount++;
      }
    });

    // 3. Evaluar regla de negocio
    if (plasticCount > ironCount) {
      return res.status(400).json({ 
        error: 'Regla de negocio fallida: No se pueden crear productos si la tienda songsyou tiene más micrófonos de plástico que de hierro.',
        counts: { plastic: plasticCount, iron: ironCount }
      });
    }

    // 4. Si la regla se cumple, creamos el micrófono
    const postResponse = await axios.post(CRUD_MICROPHONES_URL, req.body);
    res.status(201).json(postResponse.data);

  } catch (error) {
    console.error('Error in createWithBusinessRule:', error.message);
    if (error.response && error.response.data) {
      return res.status(error.response.status).json(error.response.data);
    }
    res.status(500).json({ error: 'Error interno en el servidor de reglas de negocio: ' + error.message });
  }
};
