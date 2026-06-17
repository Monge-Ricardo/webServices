const express = require('express');
const router = express.Router();
const CustomerController = require('../controllers/CustomerController');

// Rutas RESTful limpias (sin nombres de verbos en el path)
router.get('/', CustomerController.findAll);
router.get('/:id', CustomerController.findById);
router.post('/', CustomerController.create);
router.put('/:id', CustomerController.update);
router.delete('/:id', CustomerController.delete);

module.exports = router;
