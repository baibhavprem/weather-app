const request = require('request')

const forecast = (latitude, longitude, callback) => {
  const url = 'http://api.weatherstack.com/current?access_key=7932049fdf0041f201290839efbad0fe&query=' + latitude + ',' + longitude;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to network services :(', undefined)
    } else if (body.error) {
      callback('Please provide a valid set of coordinates', undefined)
    } else {
      const uvIndex = body.current.uv_index;

      // Setting up forecast according to the uv index value.
      if (uvIndex <= 2) {
        callback(undefined, `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}°C, visibility is ${body.current.visibility}, with a humidity of ${body.current.humidity}. The UV index in your area is ${uvIndex}. A UV index reading of 0 to 2 means LOW DANGER from the Sun's UV rays for the average person.`);
      } else if (3 <= uvIndex && uvIndex <= 5) {
        callback(undefined, `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}°C, visibility is ${body.current.visibility}, with a humidity of ${body.current.humidity}. The UV index in your area is ${uvIndex}. A UV index reading of 3 to 5 means MODERATE RISK of harm from unprotected sun exposure.`);
      } else if (6 <= uvIndex && uvIndex <= 7) {
        callback(undefined, `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}°C, visibility is ${body.current.visibility}, with a humidity of ${body.current.humidity}. The UV index in your area is ${uvIndex}. A UV index reading of 6 to 7 means HIGH RISK of harm from unprotected sun exposure. Protection against skin and eye damage is needed.`);
      } else if (8 <= uvIndex && uvIndex <= 10) {
        callback(undefined, `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}°C, visibility is ${body.current.visibility}, with a humidity of ${body.current.humidity}. The UV index in your area is ${uvIndex}. A UV index reading of 8 to 10 means VERY HIGH RISK of harm from unprotected sun exposure. Take extra precautions because unprotected skin and eyes will be damaged and can burn quickly.`);
      } else {
        callback(undefined, `${body.current.weather_descriptions}. The current temperature is ${body.current.temperature}°C, visibility is ${body.current.visibility}, with a humidity of ${body.current.humidity}. The UV index in your area is ${uvIndex}. A UV index reading of 11 or more means EXTREME RISK of harm from unprotected sun exposure. Take all precautions because unprotected skin and eyes can burn in minutes.`);
      }
    }
  });
}

module.exports = forecast