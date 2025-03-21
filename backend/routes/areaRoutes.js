const express = require('express');
const router = express.Router();
const { getAreas, getAreaById } = require('../controllers/AreaController');

router.get('/', getAreas);
router.get('/:id', getAreaById);

module.exports = router;
