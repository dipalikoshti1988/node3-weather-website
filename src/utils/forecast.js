const request = require("request");

// Get Temperature from latlong  //
const forecast = (latitude, longitude, callback) => {
  const url = `https://api.darksky.net/forecast/9a8ded6bb0072cf2231bf34af99e056a/${latitude},${longitude}?units=si&lang=en`;

  request({ url, json: true }, (error, response) => {
    //   console.log(response);
    //   const data = JSON.parse(response.body);
    if (error) {
      callback("Unable to connect weather service!", undefined);
    } else if (response.body.error) {
      callback("Unable to find location!", undefined);
    } else {
      const data = response.body;
      //console.log(data.currently);
      const summary = data.daily.data[0].summary;
      const temperature = data.currently.temperature;
      const precipProbability = data.currently.precipProbability;
      const newData = `${summary} It is currenty ${temperature} degrees out. There is a ${precipProbability}% chance of rain`;
      const daytemperatureLow = ` \n.Today's low temerature is ${data.daily.data[0].temperatureLow}`;
      const daytemperatureHigh = ` \n.Today's high temerature is ${data.daily.data[0].temperatureHigh}`;
      callback(
        undefined,
        `${newData} ${daytemperatureLow} ${daytemperatureHigh}`
      );
      // callback(undefined, daytemperatureLow);
      // callback(undefined, daytemperatureHigh);
      // //   console.log(
      //     `${data.daily.data[0].summary} It is currenty ${data.currently.temperature} degrees out. There is a ${data.currently.precipProbability}% chance of rain`
      //   );
    }
  });
};
// Get Temperature from latlong  //

module.exports = forecast;
