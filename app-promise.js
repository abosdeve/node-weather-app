const yargs = require('yargs');
const axios = require('axios');

const argv = yargs
  .options({
    address: {
      demand: true,
      alias: 'a',
      describe: 'Address to fetch weather for',
      string: true
    }
  })
  .help()
  .alias('help', 'h')
  .argv;

const encodedAdd = encodeURIComponent(argv.address);
const geocodeUrl = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAdd}`;

axios.get(geocodeUrl).then((response) => {
  if (response.data.status === 'ZERO_RESULTS') {
    throw new Error('Unable to find that address');
  }
  const key = '786eed90b77535b0f5dd9a3e1c2b7e9e';
  const latitude = response.data.results[0].geometry.location.lat;
  const longitude = response.data.results[0].geometry.location.lng;
  const weatherUrl = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}`;
  console.log(response.data.results[0].formatted_address);
  return axios.get(weatherUrl);
}).then((response) => {
  const temperature = response.data.currently.temperature;
  const apparentTemp = response.data.currently.apparentTemperature;
  console.log(`It is currently ${temperature}°F, apparent ${apparentTemp}°F`);
}).catch((err) => {
  if (err.code === 'ENOTFOUND') {
    console.log('Servers not found');
  } else {
    console.log(err.message);
  }
});
