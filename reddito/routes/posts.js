const express = require("express");
const router = express.Router({ mergeParams: true });
const auth = require("./helpers/auth");
const Room = require("../models/room");
const Post = require("../models/post");

router.get("/new", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    res.render("posts/new", { room: room });
  });
});

router.post("/", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    let post = new Post(req.body);
    post.room = room;

    post.save(function(err, post) {
      if (err) {
        console.error(err);
      }

      return res.redirect(`/rooms/${room._id}`);
    });
  });
});

router.use("/:postId/comments", commentsRouter);

router.post("/", auth.requireLogin, (req, res, next) => {
  Room.findById(req.params.roomId, function(err, room) {
    if (err) {
      console.error(err);
    }

    Post.findById(req.params.postId, function(err, post) {
      if (err) {
        console.error(err);
      }

      let comment = new Comment(req.body);
      post.comments.unshift(comment);

      post.save(function(err, post) {
        if (err) {
          console.error(err);
        }

        comment.save(function(err, comment) {
          if (err) {
            console.error(err);
          }

          return res.redirect(`/rooms/${room.id}`);
        });
      });
    });
  });
});

module.exports = router;
