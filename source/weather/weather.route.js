const express = require('express');
const controller = require('./weather.controller');
const parcel = require('../middleware/asyncHandler');

const router = express.Router();

//  GET: weather by city
router.get('/city', parcel(controller.GetWeatherByCity));

// GET: weather by id
router.get('/:id', controller.GetWeatherById);

// GET: weather by zip code
router.get('/city', controller.GetWeatherByZip);

module.exports = router;
