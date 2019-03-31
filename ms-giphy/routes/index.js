const express = require("express");
const router = express.Router();
const request = require("request");

const YOUR_API_KEY = "OPHuICqSM7qhvq3zVK61HVY4hgpSSLdC";

router.get("/", function(req, res, next) {
  const url = `http://api.giphy.com/v1/gifs/random?api_key=${YOUR_API_KEY}`;

  request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }

    body = JSON.parse(body);
    const imgUrl = body.data.image_original_url;

    res.render("index", { title: "Giphy Search", imgUrl: imgUrl });
  });
});

router.get("/search", (req, res, next) => {
  res.render("search");
});

router.post("/search", (req, res, next) => {
  const query = req.body["giphy-query"];
  const url = `http://api.giphy.com/v1/gifs/search?api_key=${YOUR_API_KEY}&q=${query}`;

  request.get(url, (err, response, body) => {
    if (err) {
      console.error(err);
    }

    body = JSON.parse(body);

    const randomResult =
      body.data[Math.floor(Math.random() * body.data.length)];
    const searchResultUrl = randomResult.images.fixed_height.url;

    res.render("search", { searchResultUrl: searchResultUrl });
  });
});

module.exports = router;
