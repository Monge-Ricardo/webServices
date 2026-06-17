const express = require('express');
const router = express.Router();
const BusinessRulesController = require('../controllers/BusinessRulesController');

// Rutas de reglas de negocio
router.get('/vip', BusinessRulesController.findVips);
router.get('/vip/:id', BusinessRulesController.checkVipById);

module.exports = router;
