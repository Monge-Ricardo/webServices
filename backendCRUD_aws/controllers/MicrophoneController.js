const Microphone = require('../models/Microphone');

// Obtener todos los micrófonos
exports.findAll = async (req, res) => {
  try {
    const microphones = await Microphone.find({});
    res.json(microphones);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los micrófonos: ' + error.message });
  }
};

// Crear un nuevo micrófono
exports.create = async (req, res) => {
  try {
    const { serial, nameProduct, brand, model, material, yearDuration, new: isNew, price } = req.body;

    // Validación básica
    if (serial === undefined || nameProduct === undefined || material === undefined) {
      return res.status(400).json({ error: 'Faltan campos requeridos (ej. serial, nameProduct, material)' });
    }

    const newMicrophone = new Microphone({
      serial: Number(serial),
      nameProduct,
      brand: Number(brand),
      model: Number(model),
      material,
      yearDuration: Number(yearDuration),
      new: isNew,
      price: Number(price)
    });

    await newMicrophone.save();
    res.status(201).json(newMicrophone);
  } catch (error) {
    // Manejo de error por duplicado (código 11000 en MongoDB)
    if (error.code === 11000) {
      return res.status(400).json({ error: `El micrófono con serial ${req.body.serial} ya existe.` });
    }
    res.status(500).json({ error: 'Error al registrar el micrófono: ' + error.message });
  }
};
