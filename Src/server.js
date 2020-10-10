const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geoCode = require("./utils/geocode");
const forcast = require("./utils/forcast");

const app = express();

const staticPath = path.join(__dirname, "../public/");
app.use(express.static(staticPath));

app.set("view engine", "hbs");
const partialPath = path.join(__dirname, "../views/partials");
hbs.registerPartials(partialPath);

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Created By Farid Bigham",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({
      error: "لطفا آدرس وارد نمایید",
    });
  } else {
    geoCode(req.query.address, (error, { lat, lon } = {}) => {
      if (error) {
        return res.send({
          error,
        });
      }
      forcast(lat, lon, (error, { name, temp }) => {
        if (error) {
          return res.send({
            error,
          });
        } else {
          return res.send({
            location: name,
            temp,
            address: req.query.address,
          });
        }
      });
    });
  }
});

app.listen(3000, () => {
  console.log("Server is Running");
});
