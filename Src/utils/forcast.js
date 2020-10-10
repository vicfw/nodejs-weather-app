var request = require("request");

const forcast = (lon, lat, callBack) => {
  const url = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=108d696076b33ee11c1f38b1a31f1f5b&units=metric`;

  request({ url: url, json: true }, (error, response, body) => {
    if (error) {
      callBack("درخواست اشتباه");
    } else if (body.main.length === 0) {
      callBack("Internet Fucked Up!");
    } else {
      callBack(null, {
        temp: `${body.name} Have a ${body.main.temp} deg Heat`,
        name: body.name,
      });
    }
  });
};

module.exports = forcast;
