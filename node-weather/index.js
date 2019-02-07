const request = require("request");
const argv = require("yargs").argv;

// Enter your API key from openweathermap
let apiKey = "YOUR API KEY";
let city = argv.c || "Warsaw";
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

request(url, function(err, response, body) {
  if (err) {
    console.log("error:", error);
  } else {
    let weather = JSON.parse(body);
    let message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
    console.log(message);
  }
});
