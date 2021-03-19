var express = require("express");
var router = express.Router();
var communityCrtl = require("../controllers/newsFeed");
const passport = require("passport");

/* GET home page. */
router.get("/", function(req, res, next) {
  res.render("index");
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

// Google OAuth callback route
router.get(
  "/oauth2callback",
  passport.authenticate("google", {
    successRedirect: "/show",
    failureRedirect: "/show"
  })
);

// OAuth logout route
router.get("/logout", function(req, res) {
  req.session.destroy(function() {
    res.clearCookie("connect.sid");
    res.redirect("/show");
  });
});

/* GET Submitted page. */
router.get("/submitted", function(req, res, next) {
  res.render("submitted");
});

/* POST contact us. */
router.post("/", function(req, res, next) {
  res.redirect("/submitted");
});

/* GET post page. */
router.get("/post", function(req, res, next) {
  console.log("Hey Im here its hiiting the post route");
  res.render("form");
});

/* GET show page. */
router.get("/show", communityCrtl.show);

/* POST show page. */
router.post("/show", communityCrtl.addPost);

router.delete("/show/:id", communityCrtl.remove);

router.put("/show/:id", communityCrtl.update);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/auth/google");
// }

module.exports = router;
