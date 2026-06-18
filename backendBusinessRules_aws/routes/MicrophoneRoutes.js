const express = require('express');
const router = express.Router();
const MicrophoneController = require('../controllers/MicrophoneController');

router.post('/', MicrophoneController.createWithBusinessRule);

module.exports = router;
