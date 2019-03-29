const express = require("express");
const router = express.Router();
const Review = require("../models/review");

router.get("/", (req, res) => {
  Review.find({}, (err, reviews) => {
    if (err) console.log(err);

    res.render("reviews/index", { reviews: reviews });
  });
});

router.get("/reviews/new", (req, res) => {
  res.render("reviews/new");
});

router.get("/reviews/:id", (req, res) => {
  Review.findById(req.params.id, (err, review) => {
    if (err) console.log(err);

    res.render("reviews/show", {
      review: review
    });
  });
});

router.post("/reviews", (req, res) => {
  const review = new Review(req.body);

  review.save(function(err, review) {
    if (err) {
      console.log(err);
    }

    return res.redirect(`/reviews/${review.id}`);
  });
});

module.exports = router;
