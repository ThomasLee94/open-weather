const Mood = require("../models/mood");
// const weather = require("../lib/weather");

// GET: all moods in db
async function GetAllMoods(req, res) {
  try {
    const moods = await Mood.find();
    return res.json({ status: "OK", moods });
  } catch (err) {
    return res.status(500).json({ status: "FAILED", msg: err.message });
  }
}

// GET: mood by id
// GET /api/v1/mood/:moodId -> {Mood object}
async function GetMood(req, res) {
  try {
    const mood = await Mood.findById(req.params.moodId);
    return res.json({ status: "OK", mood });
  } catch (err) {
    return res.status(500).json({ status: "FAILED", msg: err.message });
  }
}

//  GET: mood by city
//  GET /api/v1/moods/city?city=San Francisco -> [{List of mood objects}]
async function GetMoodByCity(req, res) {
  if (!req.query.city) {
    return res.status(422).json({
      status: "FAILED",
      msg: "You didn't provide the query string for the city",
    });
  }
  try {
    const moods = await Mood.find({ city: new RegExp(req.query.city, "i") });
    return res.json({ status: "OK", moods });
  } catch (err) {
    return res.status(500).json({ status: "FAILED", msg: err.message });
  }
}

//  POST: mood obj about the weather
// POST /api/v1/moods?city=San Francisco { mood: "Happy"} -> {Mood object}
async function PostMood(req, res) => {
  // user entered
  if (!req.query.city) {
    return res.status(422).json({
      status: "FAILED",
      msg: "You didn't provide the query string for the city",
    });
  }

  // User entered incorrect data
  if (!req.body.mood || !(typeof req.body.mood === "string")) {
    return res.status(403).json({
      status: "FAILED",
      msg:
        "You either didn't provide your mood or provided it as something other than a string",
    });
  }

  try {
    const weatherData = await weather.getWeatherByName(req.query.city);

    const mood = {
      mood: req.body.mood,
      city: req.query.city,
      weather: weatherData,
    };
    const createdMood = await Mood.create(mood);
    return res.json({ status: "OK", mood: createdMood });
  } catch (err) {
    return res
      .status(err.status || 500)
      .json({ status: "FAILED", msg: err.message });
  }
};

module.exports = {
  GetAllMoods,
  GetMood,
  GetMoodByCity,
  PostMood
}