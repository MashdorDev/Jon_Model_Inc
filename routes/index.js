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

/* POST home page. */
router.post("/", function(req, res, next) {
  res.render("/submitted");
});

/* GET post page. */
router.get("/post", communityCrtl.addPost);

/* GET show page. */
router.get("/show", communityCrtl.show);

/* POST show page. */
router.post("/show", communityCrtl.addPost);

// function isLoggedIn(req, res, next) {
//   if (req.isAuthenticated()) return next();
//   res.redirect("/auth/google");
// }

module.exports = router;
