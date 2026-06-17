const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  name: { type: String, required: true },
  age: { type: Number, required: true },
  moneySpent: { type: Number, required: true }
}, { 
  versionKey: false 
});

// Forzamos el mapeo a la colección 'test' como especificó el usuario
module.exports = mongoose.model('Customer', customerSchema, 'test');
