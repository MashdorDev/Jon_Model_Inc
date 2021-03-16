const Community = require("../models/community");

module.exports = {
  addPost
};

async function addPost(req, res, next) {
  try {
    let post = await Community.findById(req.user._id);

    console.log(req.body.content_post);
    post[content].push(req.body.content_post);
  } catch (error) {
    console.log(error);
  }

  // console.log(req.body.value);
  // Community.save(function(err) {
  //   console.log(req.save);
  //   res.redirect("/show");
  // });
}
