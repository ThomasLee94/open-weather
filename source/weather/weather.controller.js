const axios = require('axios');

const appID = process.API_KEY;
const API_URL = `https://api.openweathermap.org/data/2.5/weather?APPID=${appID}`;

//  GET: weather data using public API
async function GetData(url) {
  try {
    const response = await axios.get(url);
    return response.data;
  } catch (err) {
    throw err
  }
}

//  GET: weather by city
// city is zipcode
async function GetWeatherByCity(city, country = "us") {
  try {
    // Obtain the city data by name
    const query = `&q=${city},${country}`;
    return await GetData(API_URL + query);
  } catch (err) {
    throw err
  }
}

//  GET: weather by city id
async function GetWeatherById(cityId) {

  try {
    // Obtain the city data by ID
    const query = `&id=${cityID}`;
    return await handleRequest(API_URL + query);
  } catch (err) {
    throw err;
  }

}

// GET: weather by zipcode
async function GetWeatherByZip(zip, country = "us") {
  try {
    // Obtain the city data by name
    const query = `&zip=${zip},${country}`;
    return await handleRequest(API_URL + query);
  } catch (err) {
    throw err;
  }
}

module.exports = {
  GetData,
  GetWeatherByCity,
  GetWeatherById,
  GetWeatherByZip,
};