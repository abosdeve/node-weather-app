const request = require('request');

const getWeather = (latitude, longitude, callback) => {
  const key = '786eed90b77535b0f5dd9a3e1c2b7e9e';

  request({
    url: `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`,
    json: true
  }, (err, response, body) => {
    if (err) {
      callback('Unable to reach Forecast.io servers');
    } else if (response.statusCode !== 200) {
      callback('Unable to retrieve the weather');
    } else {
      callback(undefined, {
        temperature: body.currently.temperature,
        apparentTemp: body.currently.apparentTemperature
      });
    }
  });
};

module.exports = {
  getWeather
};
