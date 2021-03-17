const Community = require("../models/community");
const User = require("../models/user");

module.exports = {
  addPost,
  show
};

async function addPost(req, res, next) {
  try {
    await Community.create({
      content: req.body.content_post,
      user: req.user.id
    });

    let content = { content: req.body.content_post };

    res.redirect("/show");
  } catch (error) {
    console.log("The Error Is - " + error);
  }
}

function show(req, res) {
  Community.find({})
    .sort("-createdAt")
    .exec(async function(err, post) {
      let postsWithUsers = [];

      for (let p of post) {
        let userObj = await User.findById(p.user);

        let obj = {
          content: p.content,
          date: p.createdAt,
          userObj: userObj
        };
        console.log(obj);
        postsWithUsers.push(obj);
      }
      res.render("show", { user: req.user, post: postsWithUsers });
    });
  // await post.execPopulate("user");
}
