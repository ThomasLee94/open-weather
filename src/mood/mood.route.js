const express = require('express');
const controller = require('./mood.controller');
const parcel = require('../middleware/asyncHandler');

const router = express.Router();

//  GET: All moods
router.get('/', parcel(controller.GetAllMoods));

// GET: get mood by id
router.get('/:moodId', controller.GetMood);

// GET: moods by city
router.get('/city', controller.GetMoodsByCity);

// POST: mood
router.post('/', controller.PostMood);

module.exports = router;
