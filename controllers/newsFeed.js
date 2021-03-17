const Community = require("../models/community");
const User = require("../models/user");

module.exports = {
  addPost
};

async function addPost(req, res, next) {
  try {
    await Community.create({
      content: req.body.content_post,
      user: req.user.id
    });

    console.log("Hey im logged at line 10 ");

    let content = { content: req.body.content_post };
    console.log("Hey im logged at line 13");

    console.log(content);
    res.redirect("/show");
  } catch (error) {
    console.log("The Error Is - " + error);
  }

  // console.log(req.body.value);
  // Community.save(function(err) {
  //   console.log(req.save);
  //   res.redirect("/show");
  // });
}
