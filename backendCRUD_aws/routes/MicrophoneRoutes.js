const express = require('express');
const router = express.Router();
const MicrophoneController = require('../controllers/MicrophoneController');

router.get('/', MicrophoneController.findAll);
router.post('/', MicrophoneController.create);

module.exports = router;
