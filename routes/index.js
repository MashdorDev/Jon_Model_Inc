var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index", { title: "Express" });
});

router.get("/post", function(req, res, next) {
  res.render("post");
});

router.get("/show", function(req, res, next) {
  res.render("show");
});

router.post("/", function(req, res, next) {
  res.render("submitted");
});

module.exports = router;
