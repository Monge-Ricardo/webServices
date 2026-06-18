const mongoose = require('mongoose');

const microphoneSchema = new mongoose.Schema({
  serial: { type: Number, required: true, unique: true },
  nameProduct: { type: String, required: true },
  brand: { type: Number, required: true },
  model: { type: Number, required: true },
  material: { type: String, required: true },
  yearDuration: { type: Number, required: true },
  new: { type: String, required: true },
  price: { type: Number, required: true }
}, {
  versionKey: false
});

module.exports = mongoose.model('Microphone', microphoneSchema, 'test');
