const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=c2754a8462795e29cbb698cab8ba059e&query=${latitude},${longitude}&units=m`;

  request(
    {
      url,
      json: true,
    },
    (err, res) => {
      const { error, current } = res.body;
      if (err) {
        callback("unable to connect to weather services", undefined);
      } else if (error) {
        callback("Unable to fetch temperature, check location", undefined);
      } else {
        callback(undefined, current);
      }
    }
  );
};

module.exports = forecast;
