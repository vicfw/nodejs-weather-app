var request = require("request");

const geoCode = (address, callBack) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoidmljZnciLCJhIjoiY2tlbGV3dGVnMDkxMjJwbzRyd3NwZWF3dCJ9._kn-tL-XxtYVuHIVWmiH8A&limit=1`;
  request({ url: url, json: true }, function (error, response, body) {
    if (error) {
      return callBack("لطفا شهر را بصورت صحیح وارد کنید");
    } else if (body.features.length === 0) {
      return callBack("شهر مورد نظر یافت نشد");
    } else {
      return callBack(null, {
        lat: body.features[0].center[0],
        lon: body.features[0].center[1],
      });
    }
  });
};

module.exports = geoCode;
