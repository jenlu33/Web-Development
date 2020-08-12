const express = require('express');
const https = require('https');  // https is a native node module
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
})

app.post("/", (req, res) => {
  let query = req.body.cityName;

  let units = "imperial"
  let url =
    `https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${apiKey}&units=${units}`;
  https.get(url, (response) => {
    response.on("data", (data) => {
      let weatherData = JSON.parse(data);
      let temp = weatherData.main.temp;
      let description = weatherData.weather[0].description;
      let weatherIcon = weatherData.weather[0].icon;
      let imageURL = `https://openweathermap.org/img/wn/${weatherIcon}@2x.png`;

      // console.log(temp);
      // console.log(description);

      res.write(
        `<h1>The temperature in ${query} is ${temp} degrees Fahreneheit</h1>`
      );
      res.write(`<h3>The weather is currently ${description}</h3>`);
      res.write(`<img src=${imageURL}><img>`);
      res.send();
    });
  });
})



app.listen(3000, () => {
  console.log("server is running on port 3000");
})