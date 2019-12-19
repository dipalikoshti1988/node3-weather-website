const request = require("request");

// GeoCoding  //
// Address => lat/long -> weather
const geocode = (address, callback) => {
  address = encodeURIComponent(address);
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoiZGlwYWxpa29zaHRpMTk4OCIsImEiOiJjazNlaGxvdTExMDRuM251aXAyb3Fhc2FjIn0.Ukvc2jgnLpueC_f8XFT4aQ`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Unable to connect GeoCoding service!", undefined);
    } else if (response.body.message) {
      callback(response.body.message, undefined);
    } else {
      //   console.log(georesponse.body);
      const geodata = response.body.features[0];
      if (geodata) {
        const lat = geodata.center[1];
        const lon = geodata.center[0];
        const place_name = geodata.place_name;
        const data = {
          latitude: lat,
          longitude: lon,
          location: place_name
        };
        callback(undefined, data);
      } else {
        callback("Unable to find location!", undefined);
      }
    }
  });
};
// GeoCoding  //
// Address => lat/long -> weather

module.exports = geocode;
