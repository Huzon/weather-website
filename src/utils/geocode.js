const request = require("postman-request");

const geoCode = (address, callback) => {
  if (address == undefined) {
    return console.log("Provide an address");
  }
  const url = `
    https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
      address
    )}.json?access_token=pk.eyJ1IjoiaHV6b24iLCJhIjoiY2t6eTVvMjBwMDhnYzJ2bzNwbDE5N2ZpYyJ9.74Rn6hcVDlAihRF1lW13QQ&limit=1`;
  request(
    {
      url,
      json: true,
    },
    (error, response) => {
      if (error) {
        callback("Unable to connect to location services", undefined);
      } else {
        if (response.body.features.length > 0) {
          const { center, place_name: location } = response.body.features[0];

          callback(undefined, {
            latitude: center[1],
            longitude: center[0],
            location,
          });
        } else {
          callback("unable to find location", undefined);
        }
      }
      // console.log(response.body);
    }
  );
};

module.exports = geoCode;
