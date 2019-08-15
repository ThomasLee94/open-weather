const express = require('express');
const moodRoutes = require('./mood/mood.route');
const weatherRoutes = require('./weather/weather.route');

const router = express.Router();

router.use('/mood', moodRoutes);
router.use('/weather', weatherRoutes);

module.exports = router;